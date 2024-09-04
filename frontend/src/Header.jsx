import {
  Box,
  Button,
  Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Tag,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher.jsx';
import { catchMessage, fetchWithAxios, showToast } from './ontology/BaseFunctions';
import * as React from 'react';
import { useRef, useState } from 'react';
import insert_logo from './assets/images/insert_logo.png';
import delete_logo from './assets/images/delete_logo.png';
import ckg_logo from './assets/images/ckg_logo.png';
import ontology_logo from './assets/images/ontology_logo.png';
import event_extraction_logo from './assets/images/event_extraction_logo.png';
import event_extraction_logo_light from './assets/images/event_extraction_logo_light.png';
import { Base64 } from 'js-base64';
import { useNavigate } from 'react-router-dom';
import chartLogo from './assets/images/charts.svg';
import { Charts } from './ckg/Components/BodyComponents/Charts/Charts.jsx';
import { CKG_SECTION, EVENT_EXTRACTION_SECTION, ONTOLOGY_SECTION } from './BaseAttributes';
import { Filter } from './ckg/Components/Filter';
import { PiDotsNineBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCollapsed } from '@/ckg/features/searchPanelSlice.jsx';

export const Header = ({ showInsertAndDelete, isOnThisPage, ontologyVersion = '1.0.0' }) => {
  const searchPanelSlice = useSelector(state => state.searchPanelSlice);
  const { colorMode } = useColorMode();
  const [tokenField, setTokenField] = useState('');
  const [prefixField, setPrefixField] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValue, setFileValue] = useState('');
  const [isLoadingSendInsert, setIsLoadingSendInsert] = useState(false);
  const [isLoadingSendDelete, setIsLoadingSendDelete] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();
  const {
    isOpen: isOpenPopover,
    onOpen: onOpenPopover,
    onClose: onClosePopover,
  } = useDisclosure();
  const {
    isOpen: isOpenInsert,
    onOpen: onOpenInsert,
    onClose: onCloseInsert,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenChart,
    onOpen: onOpenChart,
    onClose: onCloseChart,
  } = useDisclosure();
  const {
    onOpen: onOpenPopoverPages,
    onClose: onClosePopoverPages,
    isOpen: isOpenPopoverPages,
  } = useDisclosure();
  const {
    onOpen: onOpenPopoverShowStatistics,
    onClose: onClosePopoverShowStatistics,
    isOpen: isOpenPopoverShowStatistics,
  } = useDisclosure();
  const dispatch = useDispatch();

  const BoxesHeader = ({ Image, Text, onClickEvent, link = null }) => {
    if (link === null) {
      return (
        <>
          <Box borderWidth={'1px'} borderRadius={9} borderColor={colorMode === 'light' ? 'white' : 'gray.700'}
               backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'} cursor={'pointer'}
               _hover={{
                 borderColor: colorMode === 'light' ? '#d8dfff' : 'gray.600',
                 backgroundColor: colorMode === 'light' ? '#d8dfff' : 'gray.600',
               }}
               onClick={onClickEvent}>
            <VStack spacing={3} py={2}>
              <Center>
                {Image}
              </Center>
              <Center>
                {Text}
              </Center>
            </VStack>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box borderWidth={'1px'} borderRadius={9} borderColor={colorMode === 'light' ? 'white' : 'gray.700'}
               backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'} cursor={'pointer'}
               _hover={{
                 borderColor: colorMode === 'light' ? '#d8dfff' : 'gray.600',
                 backgroundColor: colorMode === 'light' ? '#d8dfff' : 'gray.600',
               }}
               onClick={() => {
                 if (isOnThisPage === CKG_SECTION && link === '/') {
                   window.location.reload();
                 } else {
                   navigate(link, { replace: true });
                 }
                 onClosePopoverPages();
               }}>
            <VStack spacing={3} py={2}>
              <Center>
                {Image}
              </Center>
              <Center>
                {Text}
              </Center>
            </VStack>
          </Box>
        </>
      );
    }
  };

  const insertToken = () => {
    if (prefixField !== '' && tokenField !== '' && selectedFile !== null) {
      fetchWithAxios.post(`/ontology/?prefix=${prefixField}`, {
        'ontology': fileValue,
        'file_name': selectedFile.name,
        'token': tokenField,
      })
        .then(function(response) {
            showToast('با موفقیت انجام شد', response.data.message, 0);
            setIsLoadingSendInsert(false);
            setTimeout(function() {
              window.location.reload();
            }, 2000);
          },
        ).catch((e) => {
        catchMessage(e);
        setIsLoadingSendInsert(false);
        document.getElementById('input_token_insert_id').disabled = false;
        document.getElementById('input_prefix_insert_id').disabled = false;
        document.getElementById('button_input_file_token_id').disabled = false;
      });
    } else {
      if (tokenField === '') {
        showToast('خطا', 'فیلد توکن را تکمیل کنید', 1);
      } else if (prefixField === '') {
        showToast('خطا', 'فیلد prefix را تکمیل کنید', 1);
      } else if (selectedFile === null) {
        showToast('خطا', 'فایلی انتخاب کنید', 1);
      }
    }
  };

  const deleteToken = () => {
    fetchWithAxios.delete(`/ontology/?token=${tokenField}`, {})
      .then(function(response) {
          showToast('با موفقیت انجام شد', response.data.message, 0);
          setIsLoadingSendDelete(false);
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        },
      ).catch((e) => {
      catchMessage(e);
      setIsLoadingSendDelete(false);
      document.getElementById('input_token_delete_id').disabled = false;
    });
  };

  const getUploadedFileValue = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setFileValue(Base64.encode(String(await e.target.result)));
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Box position={'sticky'} top={0} px={7} w={'100%'} backgroundColor={useColorModeValue('white', '#283b4d')}
           className={'box_shadow'} zIndex={'998 !important'}>
        <Grid templateColumns="repeat(10, 1fr)" gap={4}>
          <GridItem my={'auto'} p={2} colStart={1} colEnd={4}>
            {showInsertAndDelete ?
              <Popover>
                <PopoverTrigger>
                  <Button backgroundColor={'transparent'} _hover={{ backgroundColor: 'transparent' }} p={0}>
                    <SettingsIcon w={'20px'} h={'20px'} cursor={'pointer'} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width={'210px'} className={'box_shadow'}>
                  <PopoverArrow />
                  <PopoverBody>
                    <SimpleGrid columns={2} spacing={1}>
                      <BoxesHeader
                        Image={<Image src={insert_logo} alt={'insert logo'} width={'50px'} height={'50px'} />}
                        Text={
                          <Text fontSize={'15px'} color={colorMode === 'light' ? 'black' : 'white'}>
                            وارد کردن
                          </Text>
                        }
                        onClickEvent={onOpenInsert}
                      />

                      <BoxesHeader
                        Image={<Image src={delete_logo} alt={'delete logo'} width={'50px'} height={'50px'} />}
                        Text={
                          <Text fontSize={'15px'} color={colorMode === 'light' ? 'black' : 'white'}>
                            حذف
                          </Text>
                        }
                        onClickEvent={onOpenDelete}
                      />
                    </SimpleGrid>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              :
              <Popover isOpen={isOpenPopoverShowStatistics} onOpen={onOpenPopoverShowStatistics}
                       onClose={onClosePopoverShowStatistics}>
                <PopoverTrigger>
                  <Button backgroundColor={'transparent'} _hover={{ backgroundColor: 'transparent' }} p={0}>
                    <SettingsIcon w={'20px'} h={'20px'} cursor={'pointer'} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent maxW={'150px'} className={'box_shadow'}>
                  <PopoverArrow />
                  <PopoverBody>
                    <BoxesHeader
                      Image={<Image src={chartLogo} alt={'insert logo'} width={'50px'} height={'50px'} />}
                      Text={
                        <Text fontSize={'15px'} color={colorMode === 'light' ? 'black' : 'white'}>
                          نمایش آمار
                        </Text>
                      }
                      onClickEvent={onOpenChart}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            }

            <ColorModeSwitcher />
          </GridItem>

          <GridItem colStart={4} colEnd={8} my={'auto'}>
            <Center>
              {isOnThisPage === ONTOLOGY_SECTION &&
                <HStack spacing={2}>
                  <Text cursor={'default'} mt={4} fontSize={'11px'} as={'b'}
                        color={colorMode === 'light' ? 'gray.400' : 'gray.300'}>
                    نسخه {ontologyVersion}
                  </Text>
                  <Text pr={0} cursor={'default'} fontSize={'18px'} as={'b'}
                        color={colorMode === 'light' ? 'black' : 'white'}>
                    آنتولوژی
                  </Text>
                  <Image src={ontology_logo} w={'30px'} />
                </HStack>
              }
              {isOnThisPage === CKG_SECTION &&
                <HStack spacing={2} cursor={'pointer'}
                        onClick={() => {
                          navigate('/');
                          window.location.reload();
                        }}>
                  <Text mt={1} fontSize={'17px'} as={'b'}
                        color={colorMode === 'light' ? 'black' : 'white'}>
                    گراف دانش
                  </Text>
                  <Image src={ckg_logo} w={'40px'} />
                </HStack>
              }
              {isOnThisPage === EVENT_EXTRACTION_SECTION &&
                <HStack spacing={2} cursor={'pointer'}>
                  <Text mt={1} fontSize={'17px'} as={'b'}
                        color={colorMode === 'light' ? 'black' : 'white'}>
                    استخراج رویداد
                  </Text>
                  <Image src={colorMode === 'light' ? event_extraction_logo : event_extraction_logo_light} w={'40px'} />
                </HStack>
              }
            </Center>
          </GridItem>

          <GridItem dir={'rtl'} colStart={9} colEnd={11} my={'auto'}>
            <HStack spacing={3}>
              <Popover isOpen={isOpenPopoverPages} onOpen={onOpenPopoverPages} onClose={onClosePopoverPages}>
                <PopoverTrigger>
                  <Button backgroundColor={'transparent'} _hover={{ backgroundColor: 'transparent' }} p={0}>
                    <PiDotsNineBold color={colorMode === 'light' ? 'gray' : 'white'} fontSize={'35px'} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width={'350px'} className={'box_shadow'}>
                  <PopoverArrow />
                  <PopoverBody>
                    <SimpleGrid columns={3} spacing={1}>
                      <BoxesHeader
                        Image={<Image src={colorMode === 'light' ? event_extraction_logo : event_extraction_logo_light}
                                      alt={'event_extraction_logo'} width={'50px'} height={'50px'} />}
                        Text={
                          <Text fontSize={'15px'} color={colorMode === 'light' ? 'black' : 'white'}>
                            استخراج رویداد
                          </Text>
                        }
                        link={'/event-extraction'}
                      />

                      <BoxesHeader
                        Image={<Image src={ontology_logo} alt={'ontology_logo'} width={'50px'} height={'50px'} />}
                        Text={
                          <Text fontSize={'15px'} color={colorMode === 'light' ? 'black' : 'white'}>
                            آنتولوژی
                          </Text>
                        }
                        link={'/ontology'}
                      />

                      <BoxesHeader
                        Image={<Image src={ckg_logo} alt={'ckg_logo'} width={'50px'} height={'50px'} />}
                        Text={
                          <Text fontSize={'15px'} color={colorMode === 'light' ? 'black' : 'white'}>
                            گراف دانش
                          </Text>
                        }
                        link={'/'}
                      />
                    </SimpleGrid>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              {isOnThisPage === CKG_SECTION &&
                <Tooltip hasArrow label="فیلتر" bg="gray.300" color="black">
                  <HamburgerIcon ref={btnRef} cursor={'pointer'} fontSize={'34px'}
                                 color={colorMode === 'light' ? 'gray' : 'white'}
                                 onClick={() => {
                                   if (searchPanelSlice.isMoved) {
                                     onOpenFilter();
                                   } else {
                                     dispatch(setIsCollapsed(!searchPanelSlice.isCollapsed));
                                   }
                                 }} />
                </Tooltip>
              }
            </HStack>
          </GridItem>
        </Grid>
      </Box>

      <Modal closeOnOverlayClick={!isLoadingSendInsert} isOpen={isOpenInsert} onClose={onCloseInsert} isCentered>
        <ModalOverlay />
        <ModalContent zIndex={'996 !important'}>
          <ModalBody dir={'rtl'} p={6}>
            <VStack spacing={3}>
              <FormControl isRequired>
                <FormLabel>توکن:</FormLabel>
                <Input id={'input_token_insert_id'} value={tokenField} dir={'ltr'} placeholder="توکن"
                       onChange={(e) => setTokenField(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>prefix:</FormLabel>
                <Input id={'input_prefix_insert_id'} value={prefixField} dir={'ltr'} placeholder={'prefix'}
                       onChange={(e) => setPrefixField(e.target.value)} />
              </FormControl>

              <Input id={'input_file_token_id'} type={'file'} display={'none'} accept={'.ttl'}
                     onChange={(event) => {
                       if (event.target.files.length === 0) {
                         setSelectedFile(null);
                       } else {
                         setSelectedFile(event.target.files[0]);
                         getUploadedFileValue(event.target.files[0]).then(null);
                       }
                     }} />

              <HStack spacing={1} w={'100%'}>
                <VStack>
                  <Button id={'button_input_file_token_id'} w={'100%'}
                          backgroundColor={useColorModeValue('orange.200', 'orange.600')}
                          _hover={{ backgroundColor: useColorModeValue('orange.300', 'orange.700') }}
                          onClick={() => {
                            document.getElementById('input_file_token_id').click();
                          }}
                          onMouseOver={() => {
                            if (selectedFile !== null) {
                              onOpenPopover();
                            }
                          }}
                          onMouseLeave={() => {
                            if (selectedFile !== null) {
                              onClosePopover();
                            }
                          }}>
                    {selectedFile !== null ? 'فایل انتخاب شد' : 'انتخاب فایل'}
                  </Button>

                  <Box position={'absolute'} top={'240px'} right={'320px'}>
                    <Popover isOpen={isOpenPopover} onOpen={onOpenPopover} onClose={onClosePopover} placement="bottom"
                             closeOnBlur={false}>
                      <PopoverContent maxW={'400px'} overflowX={'auto'} p={4} className={'box_shadow'}>
                        {selectedFile !== null ?
                          <>
                            <VStack spacing={3}>
                              <HStack spacing={3}>
                                <Text cursor={'default'} fontSize={['10px', '12px', '14px', '16px']}
                                      color={colorMode === 'light' ? 'black' : 'white'}>نام فایل:</Text>
                                <Tag variant="solid" colorScheme="teal">{selectedFile.name}</Tag>
                              </HStack>

                              <HStack spacing={3}>
                                <Text cursor={'default'} fontSize={['10px', '12px', '14px', '16px']}
                                      color={colorMode === 'light' ? 'black' : 'white'}>اندازه فایل:</Text>
                                <Tag variant="solid" colorScheme="teal">{selectedFile.size} بایت</Tag>
                              </HStack>

                              <HStack spacing={3}>
                                <Text cursor={'default'} fontSize={['10px', '12px', '14px', '16px']}
                                      color={colorMode === 'light' ? 'black' : 'white'}>نوع فایل:</Text>
                                <Tag variant="solid" colorScheme="teal">{selectedFile.type}</Tag>
                              </HStack>
                            </VStack>
                          </>
                          : null
                        }
                      </PopoverContent>
                    </Popover>
                  </Box>
                </VStack>

                <Tooltip isDisabled={selectedFile !== null && tokenField !== ''} hasArrow
                         label="مقادیر بالا را تکمیل کرده و فایلی انتخاب کنید" bg="gray.300" color="black">
                  <Button w={'100%'} backgroundColor={useColorModeValue('green.200', 'green.600')}
                          _hover={{ backgroundColor: useColorModeValue('green.300', 'green.700') }}
                          isLoading={isLoadingSendInsert} loadingText={'در حال ارسال'}
                          onClick={() => {
                            if (selectedFile !== null && tokenField !== '') {
                              setIsLoadingSendInsert(true);
                              document.getElementById('input_token_insert_id').disabled = true;
                              document.getElementById('input_prefix_insert_id').disabled = true;
                              document.getElementById('button_input_file_token_id').disabled = true;
                              insertToken();
                            }
                          }}>
                    ارسال
                  </Button>
                </Tooltip>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal closeOnOverlayClick={!isLoadingSendDelete} isOpen={isOpenDelete} onClose={onCloseDelete} isCentered>
        <ModalOverlay />
        <ModalContent zIndex={'996 !important'}>
          <ModalBody dir={'rtl'} p={6}>
            <VStack spacing={3}>
              <FormControl isRequired>
                <FormLabel>توکن:</FormLabel>
                <Input id={'input_token_delete_id'} value={tokenField} dir={'ltr'} placeholder="توکن"
                       onChange={(e) => setTokenField(e.target.value)} />
              </FormControl>

              <Tooltip isDisabled={tokenField !== ''} hasArrow
                       label="مقدار توکن را وارد کنید" bg="gray.300" color="black">
                <Button w={'100%'} backgroundColor={useColorModeValue('red.400', 'red.600')}
                        _hover={{ backgroundColor: useColorModeValue('red.300', 'red.700') }}
                        textColor={'white'}
                        isLoading={isLoadingSendDelete} loadingText={'در حال ارسال'}
                        onClick={() => {
                          if (tokenField !== '') {
                            document.getElementById('input_token_delete_id').disabled = true;
                            setIsLoadingSendDelete(true);
                            deleteToken();
                          }
                        }}>
                  ارسال
                </Button>
              </Tooltip>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal size={'6xl'} isOpen={isOpenChart} onClose={onCloseChart} isCentered scrollBehavior={'inside'}>
        <ModalOverlay />
        <ModalContent zIndex={'996 !important'} h={'80dvh'}>
          <ModalBody dir={'rtl'} px={6} pb={6} pt={0}>
            <Charts />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Drawer isOpen={isOpenFilter} placement="right" onClose={onCloseFilter}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>فیلتر</DrawerHeader>

          <DrawerBody dir={'rtl'}>
            <Filter />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
