import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material"
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { useItemPagina } from "../../state/hooks/useItemPagina"
import { paginaBase } from "../../types/Pagina"

const PaginaBaseAdmin = () => {
    const itemsDaPagina = useItemPagina()
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" sx={{ my: 4, p:2 , display: 'inline', fontWeight: 'bold', color: 'darkslateblue', backgroundColor: 'white', boxShadow: 7 , borderRadius: 4}}>
                            {itemsDaPagina.nomePagina}
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            {itemsDaPagina.menu.map(item => (
                                <Link key={`${paginaBase}${item}`} component={RouterLink} to={`${paginaBase}${item}`} >
                                    <Button sx={{ my: 2, color: 'white' }}>
                                        {item}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin