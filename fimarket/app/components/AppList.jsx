import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, Link, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid2, Tooltip,IconButton } from '@mui/material'; // Importing Grid2 correctly
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';



const AppList = ({ filterType, searchTerm, userApps = [], setUserApps, sortingApps, appDef }) => { // Default value for userApps and new props
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleClickDialog = ( ) => { 

    };

    const handleStorageChange = () => {
        // Check if the user is authenticated based on the localStorage value
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        // Update the local state with the authentication status
        setIsAuthenticated(authStatus);
    };

    const handleSaveClick = (app) => {
        handleStorageChange();
        if (!isAuthenticated) {
            setSaveDialogOpen(true);
        } else {
            // Check if the app is already saved
            if (!isAppSaved(app)) {
                const updatedUserApps = [...userApps, app];
                setUserApps(updatedUserApps);
                localStorage.setItem("userApps", JSON.stringify(updatedUserApps)); // Save to localStorage
            }
        }
    };

    const filteredApps = sortingApps.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterType || filterType === 'All' || app.source === filterType) // Filtering logic
    );

    const isAppSaved = (app) => userApps.some(userApp => userApp.title === app.title);

    return (
        <Box sx={{ width: '100%', bgcolor: 'transparent', backdropFilter: 'blur(5px)', borderRadius: 2, p: 2 }}>
            <List>
                {filteredApps.map((app, index) => (                                                  
                        <ListItem 
                            key={index}
                            sx={{ 
                                bgcolor: 'background.paper', 
                                borderRadius: 2, mb: 1, 
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }, 
                                display: 'flex', 
                                flexDirection: 'column' 
                            }}
                            onClick={() => handleClickDialog()}
                        >                            
                            <Grid2 container spacing={2} alignItems="center"> {/* Using Grid2 from @mui/material */}                                
                                <Grid2 xs={12} sm={2}> {/* Correctly using Grid2's item property */}
                                    <ListItemAvatar>
                                        <Avatar src={app.logo} sx={{ width: { xs: 40, sm: 60 }, height: { xs: 40, sm: 60 } }} />
                                    </ListItemAvatar>
                                </Grid2>
                                <Grid2 sx={{
                                        xs: 12,
                                        sm: 6,
                                        mr: "auto"
                                    }} 
                                >
                                    <ListItemText 
                                        primary={app.title} 
                                        secondary={`${app.info} - ${app.description}`} 
                                        primaryTypographyProps={{      
                                            fontWeight: 'bold',      
                                            color: 'text.dark',        
                                        }}                                
                                    />
                                </Grid2>
                                <Grid2
                                    display="flex" 
                                    justifyContent="flex-end" 
                                    sx = {{ 
                                        xs: 12, 
                                        sm: 4, 
                                        ml: "auto"
                                    }} 
                                >
                                    <Link href={app.url} target="_blank" sx={{ textDecoration: 'none', mr: 1 }}>
                                        <Tooltip 
                                            ml ='auto'
                                            title='Download'
                                            color='primary'
                                            arrow
                                            sx={{
                                                '& .MuiTooltip-tooltip': { // Cambia esta clase
                                                    bgcolor: 'primary.main', // Cambia el color de fondo
                                                    color: 'white',          // Cambia el color del texto
                                                },
                                                '& .MuiTooltip-arrow': {     // Cambia el color de la flecha
                                                    color: 'primary.main',   // Haz que coincida con el fondo
                                                },
                                            }}                                       
                                        > 
                                        <IconButton>
                                            <FileDownloadTwoToneIcon sx={{ fontSize:30 }} />
                                        </IconButton>
                                        </Tooltip>
                                    </Link>

                                    <Button
                                        variant={isAppSaved(app) ? "disabled" : "contained"}
                                        color="secondary"
                                        fullWidth
                                        onClick={() => handleSaveClick(app)}
                                    >
                                            
                                        {isAppSaved(app) ? "Saved" : "Save"}
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </ListItem>
                ))}
            </List>
            <Dialog
                open={saveDialogOpen}
                onClose={() => setSaveDialogOpen(false)}
                sx={{
                    backdropFilter: 'blur(5px)',
                }}
            >
                {isAuthenticated ? (<DialogTitle>App saved successfully!</DialogTitle>) : (<DialogTitle>Sign in to save apps</DialogTitle>)}
            </Dialog>
        </Box>
    );
};

export default AppList;
