import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PurchasedProductCard from './PurchasedProductCard';

export default function Inventory() {
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState(() => {
        const user = sessionStorage.getItem("user");
        return user || '';
    });

    const [PurchasedItems, setPurchasedItems] = useState([]);

    const getUser = React.useCallback(() => {
        if (location.state != null) {
            sessionStorage.setItem("user", location.state.purchaseUser);
            setCurrentUser(sessionStorage.getItem("user"));
        }
    }, [location.state]);


    useEffect(() => {

        let allItems = [];

        getUser();

        let fData = new FormData();

        fData.append('user', currentUser);

        const getData = async () => {
            await fetch("http://localhost/innovate_recipe/Backend/GetPurchasedData.php/", {
                method: 'POST',
                body: fData
            })
                .then((res) => res.json())
                .then((jsonData) => allItems = jsonData)
                .catch((err) => {
                    console.log(err.message);
                });

            filterItems();
        }

        const filterItems = () => {
            let displayItems = [];
            for (var i = 1; i < allItems.length; i++) {
                if (allItems[0].includes(allItems[i]['Title'])) {
                    displayItems.push(allItems[i]);
                }
            }
            setPurchasedItems(displayItems);
        }

        getData();

    }, [currentUser, getUser]);

    
    const listPurchasedItems = PurchasedItems.map((item, index) =>
        <Grid sx={{ display: 'flex', justifyContent: 'center', my: 3 }} key={PurchasedItems[index].ID} xs={12}>
            <PurchasedProductCard
                title={PurchasedItems[index].Title}
                description={PurchasedItems[index].Description}
                chef={PurchasedItems[index].Chef}
                image={PurchasedItems[index].Image}
                instructions={PurchasedItems[index].Instructions}
            />
        </Grid>
    );

    return (
        <Box>
            <Grid container>
                {listPurchasedItems}
            </Grid>
        </Box>
    );
}

