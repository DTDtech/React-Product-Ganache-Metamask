import * as React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from './Card';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import SendEther from "./SendEther.json";
import { ethers } from "ethers";
import Modal from '@mui/material/Modal';

export default function App() {
  const contractAddress = "0x454781EcE44Fc5fCBE16146e15818Bc98A28B4D6";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilteredData, setSearchFilteredData] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const user = sessionStorage.getItem("user");
    return user || '';
  });

  const [purchased_Item, set_Purchased_Item] = useState(() => {
    const items = sessionStorage.getItem("items");
    return items || "";
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();

  const getUser = React.useCallback(() => {
    if (location.state != null) {
      sessionStorage.setItem("user", location.state.currentUser);
      setCurrentUser(sessionStorage.getItem("user"));
    }
  }, [location.state]);

  const [nftPrice, setNFTPrice] = useState("");
  const [nftTitle, setNFTTitle] = useState("");

  useEffect(() => {

    getUser();

    let fData = new FormData();

    fData.append('user', currentUser);

    if (sessionStorage.getItem("items")) {
      fData.append('item', purchased_Item);
    }
    else {
      fData.set('item', "");
      sessionStorage.setItem("items", "");
    }

    const getData = async () => {
      await fetch("http://localhost/innovate_recipe/Backend/GetProductData.php/", {
        method: 'POST',
        body: fData
      })
        .then((res) => res.json())
        .then((jsonData) => {
          setData(jsonData);
          setFilteredData(jsonData);
          setSearchFilteredData(jsonData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    getData().catch(console.error);
  }, [currentUser, purchased_Item, location.state, getUser])



  const handleFilterChange = (event) => {
    const query = event.target.value;
    const filterData = data.filter((item) => {
      return query.match(item.Course);
    });
    setFilteredData(filterData);
    setSearchFilteredData(filterData);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    const filterData = filteredData.filter((item) => {
      return item.Title.toLowerCase().includes(query.toLowerCase());
    });
    setSearchFilteredData(filterData);
  }

  const navigate = useNavigate();

  const navigateToInventory = (user) => {
    navigate('/Inventory', { state: { purchaseUser: user } });
  };

  const buyRecipe = async (title, price) => {
    setNFTPrice(price);
    setNFTTitle(title);
    if (currentUser !== '') {
      handleOpen();
    }
    else {
      alert("Please log in to purchase recipe.");
    }
  }

  const HandleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("retrieved provider");

      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const transaction = new ethers.Contract(contractAddress, SendEther, signer);
      const transactionResult = await transaction.transfer(data.get("receiver"), ethers.parseEther(nftPrice));

      handleClose();

      let fData = new FormData();
      if (transactionResult.hash !== null) {
        fData.append("RecipeTitle", nftTitle);
        fData.append("User", currentUser);
        await fetch("http://localhost/innovate_recipe/Backend/Purchase.php/", {
          method: 'POST',
          body: fData
        })
          .then((res) => res.json())
          .then((data) => set_Purchased_Item(data))
          .catch((err) => {
            console.log(err.message);
          });

        fData.delete("RecipeTitle");
        let updateSessionData = sessionStorage.getItem("items").concat(nftTitle);
        sessionStorage.setItem("items", updateSessionData);
        set_Purchased_Item(sessionStorage.getItem("items"));
        navigateToInventory();
      }
    }
    else {
      let fData = new FormData();
      fData.append("RecipeTitle", nftTitle);
      fData.append("User", currentUser);
      await fetch("http://localhost/innovate_recipe/Backend/Purchase.php/", {
        method: 'POST',
        body: fData
      })
        .then((res) => res.json())
        .then((data) => set_Purchased_Item(data))
        .catch((err) => {
          console.log(err.message);
        });

      fData.delete("RecipeTitle");
      let updateSessionData = sessionStorage.getItem("items").concat(nftTitle);
      sessionStorage.setItem("items", updateSessionData);
      set_Purchased_Item(sessionStorage.getItem("items"));
      navigateToInventory();
    }
  }

  const listItems = searchFilteredData.map((item, index) =>
    <Grid sx={{ display: 'flex', justifyContent: 'center', my: 3 }} key={searchFilteredData[index].ID} xs={3}>
      <ProductCard
        title={searchFilteredData[index].Title}
        description={searchFilteredData[index].Description}
        chef={searchFilteredData[index].Chef}
        price={searchFilteredData[index].Price}
        image={searchFilteredData[index].Image}
        handleBuy={buyRecipe}
      />
    </Grid>
  );

  return (
    <Box>
      <Grid container>
        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '75%' }}>
            <FilterButton onChange={handleFilterChange} />
          </Box>
        </Grid>
        <Grid xs={9} sx={{ display: 'flex', justifyContent: 'start' }}>
          <Box component="form" sx={{ width: '50%', ml: 15, mt: 2 }}>
            <SearchBar onChange={handleSearch} />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        {listItems}
      </Grid>
      <Grid container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <form name="submitInfo" onSubmit={HandleTransfer}>
              <Box sx={{}}>
                <input
                  type="text"
                  name="receiver"
                  className="input"
                  placeholder="Address of the NFT seller"
                />
                <button
                  type="submit"
                  className="btn btn-primary submit-button"
                >
                  Submit
                </button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Grid>
    </Box>
  );


}
