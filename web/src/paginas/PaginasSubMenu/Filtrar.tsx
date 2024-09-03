import { Alert, Box, Button } from "@mui/material";
import { useRef, useState } from "react";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fileURLToPath } from "url";


const Filtrar: React.FC = () => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [pasta, setPasta] = useState('');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        var nome = event.target.files?.[0].name;
        setErrorMessage('');
        setShowError(false);
        if (nome) {
            setErrorMessage('Somente arquivos .txt sao permitidos');
            setShowError(true);
        }

    };


    return (
        <><Box sx={{ '& > :not(style)': { m: 1 } }}>
            {showError ? (
                <Alert severity="error">{errorMessage}</Alert>
            ) : null}
            
            <Button variant="file" startIcon={<CloudUploadIcon />}>Selecione Arquivo</Button>


        </Box>
        <div className="container">
        </div></>
    );

};

export default Filtrar;