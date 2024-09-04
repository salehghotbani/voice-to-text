import * as React from 'react';
import { useState } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Header } from './Header';
import Fonts from './Fonts';
import './App.css';
import theme from './theme';
import { Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CKG_SECTION } from './BaseAttributes';

function App() {
  const [showInsertAndDelete, setShowInsertAndDelete] = useState(false);
  const [isOnThisPage, setIsOnThisPage] = useState(CKG_SECTION);
  const [ontologyIri, setOntologyIri] = useState('');
  const [userImage, setUserImage] = useState('');
  const [objectLabel, setObjectLabel] = useState('');

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Box overflowY={'auto'} overflowX={'hidden'} h={'100dvh'}>
        <Header showInsertAndDelete={showInsertAndDelete} isOnThisPage={isOnThisPage}
                ontologyVersion={ontologyIri?.toString()?.split('/')[(ontologyIri?.toString()?.split('/').length) - 1]} />

        <AnimatePresence>
          <Routes>
            <Route path="/" element={
              <motion.div
                key="searchPanel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SearchPanel setShowInsertAndDelete={setShowInsertAndDelete} setIsOnThisPage={setIsOnThisPage}
                             userImage={userImage} setUserImage={setUserImage} objectLabel={objectLabel}
                             setObjectLabel={setObjectLabel} />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </Box>
    </ChakraProvider>
  );
}

export default App;
