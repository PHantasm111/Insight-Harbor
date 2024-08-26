import React, { useState, useEffect } from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    InboxIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

const ToolsSideBar = () => {
    // Status of each Accordion - Level 1
    const [open, setOpen] = React.useState(0);

    // Status of each Accordion - Level 2
    const [openIngestion, setOpenIngestion] = useState(false);
    const [openPreparation, setOpenPreparation] = useState(false);
    const [openAnalysis, setOpenAnalysis] = useState(false);
    const [openIndex, setOpenIndex] = useState(false);
    const [openDb, setOpenDb] = useState(false);
    const [openFS, setOpenFS] = useState(false);
    const [openOS, setOpenOS] = useState(false);
    const [openRDB, setOpenRDB] = useState(false);
    const [openNDB, setOpenNDB] = useState(false);

    // List to store tools name
    const [ingestionTools, setIngestionTools] = useState([]);
    const [preparationTools, setPreparationTools] = useState([]);
    const [analysisTools, setAnalysis] = useState([]);
    const [storageIBS, setStorageIBS] = useState([]);
    const [storage_RDB, setStorage_RDB] = useState([]);
    const [storageNosql, setStorageNosql] = useState([]);
    const [storageFS, setStorageFS] = useState([]);
    const [storageOS, setStorageOS] = useState([]);

    //console.log(ingestionTools);

    const getInfoTool = async (idTool) => {
        try {
            console.log('Fetching info for tool ID:', idTool);
            const infoTool = await axios.get("http://localhost:3000/tool/" + idTool)
            console.log(infoTool);
        } catch (err) {
            console.error("Err fetching :", err);
        }
        }

    // Utlize useEffect() to get the list of tools when the page is ready from rendering
    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await axios.get('http://localhost:3000/tool/getTools');
                const tools = response.data;

                setIngestionTools(tools.ingestionTools);
                setPreparationTools(tools.preparationTools);
                setAnalysis(tools.analysisTools);
                setStorageIBS(tools.storage_IBS);
                setStorage_RDB(tools.storage_RDB);
                setStorageNosql(tools.storageNosql);
                setStorageFS(tools.storageFS);
                setStorageOS(tools.storageOS);

            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        fetchTools();
    }, []);

    // Function to handle open and close the accordion
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleToggle = (setter) => {
        setter(prev => !prev);
    };
    return (
        <div className="flex bg-gray-100 ml-1">
            <div className="sidebar">
                <Card className="h-auto w-full max-w-[20rem] mb-2 pr-2">
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray" className="uppercase">
                            Tool exhibition
                        </Typography>
                    </div>
                    <List>
                        {/* Datalake tools */}
                        <Accordion
                            open={open === 1}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 1} key="data_lake_tools">
                                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                        </svg>
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Data Lake tools
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                {/* List 3 zones */}
                                <List className="p-0">
                                    {/* Ingestion tools list */}
                                    <Accordion open={openIngestion === true}>
                                        <ListItem className="p-0" selected={openIngestion} key="Ingestion_tools">
                                            <AccordionHeader onClick={() => handleToggle(setOpenIngestion)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${openIngestion === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    Ingestion tools
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {ingestionTools.map((tool) => (
                                                    <ListItem key={tool.id_t} onClick={() => getInfoTool(tool.id_t)}>{tool.name_t}</ListItem>
                                                ))}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                    {/* Preparation tools List */}
                                    <Accordion open={openPreparation === true}>
                                        <ListItem className="p-0" selected={openPreparation === true} key="preparation_tools">
                                            <AccordionHeader onClick={() => handleToggle(setOpenPreparation)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${openPreparation === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    Preparation tools
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {preparationTools.map(tool => (
                                                    <ListItem key={tool.id_t}>{tool.name_t}</ListItem>
                                                ))}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                    {/* Analysis tools list */}
                                    <Accordion open={openAnalysis === true}>
                                        <ListItem className="p-0" selected={openAnalysis === true} key="analysis_tools">
                                            <AccordionHeader onClick={() => handleToggle(setOpenAnalysis)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${setOpenAnalysis === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    Analysis tools
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {analysisTools.map(tool => (
                                                    <ListItem key={tool.id_t}>{tool.name_t}</ListItem>
                                                ))}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        {/* Storage tools */}
                        <Accordion
                            open={open === 2}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 2} key="storage">
                                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                        </svg>
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-normal">
                                        Storage
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">

                                <List className="p-0">
                                    {/* Index based system */}
                                    <Accordion open={openIndex === true}>
                                        <ListItem className="p-0" selected={openIndex} key="IBS">
                                            <AccordionHeader onClick={() => handleToggle(setOpenIndex)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${openIndex === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    Index based system
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {storageIBS.map(tool => (
                                                    <ListItem key={tool.id_sto}>{tool.name_sto}</ListItem>
                                                ))}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>

                                    {/* Database */}
                                    <Accordion open={openDb === true}>
                                        <ListItem className="p-0" selected={openDb} key="DB">
                                            <AccordionHeader onClick={() => handleToggle(setOpenDb)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${openDb === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    Database
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {/* Relational DB */}
                                                <Accordion open={openRDB === true}>
                                                    <ListItem className="p-0" selected={openRDB} key="RDB">
                                                        <AccordionHeader onClick={() => handleToggle(setOpenRDB)} className="border-b-0 p-3 flex items-center">
                                                            <ListItemPrefix>
                                                                <ChevronRightIcon
                                                                    strokeWidth={3}
                                                                    className={`h-3 w-5 transition-transform ${openRDB === true ? "rotate-90" : ""}`}
                                                                />
                                                            </ListItemPrefix>
                                                            <Typography color="blue-gray" className="mr-auto">
                                                                Relational Database
                                                            </Typography>
                                                        </AccordionHeader>
                                                    </ListItem>
                                                    <AccordionBody className="py-1">
                                                        <List className="p-0 pl-4">
                                                            {storage_RDB.map(tool => (
                                                                <ListItem key={tool.id_sto}>{tool.name_sto}</ListItem>
                                                            ))}
                                                        </List>
                                                    </AccordionBody>
                                                </Accordion>
                                                {/* NoSql DB */}
                                                <Accordion open={openNDB === true}>
                                                    <ListItem className="p-0" selected={openNDB} key="Nosql">
                                                        <AccordionHeader onClick={() => handleToggle(setOpenNDB)} className="border-b-0 p-3 flex items-center">
                                                            <ListItemPrefix>
                                                                <ChevronRightIcon
                                                                    strokeWidth={3}
                                                                    className={`h-3 w-5 transition-transform ${openNDB === true ? "rotate-90" : ""}`}
                                                                />
                                                            </ListItemPrefix>
                                                            <Typography color="blue-gray" className="mr-auto">
                                                                NoSQL Database
                                                            </Typography>
                                                        </AccordionHeader>
                                                    </ListItem>
                                                    <AccordionBody className="py-1">
                                                        <List className="p-0 pl-4">
                                                            {storageNosql.map(tool => (
                                                                <ListItem key={tool.id_sto}>{tool.name_sto}</ListItem>
                                                            ))}
                                                        </List>
                                                    </AccordionBody>
                                                </Accordion>
                                            </List>
                                        </AccordionBody>
                                    </Accordion>

                                    {/* File system */}
                                    <Accordion open={openFS === true}>
                                        <ListItem className="p-0" selected={openFS} key="FS">
                                            <AccordionHeader onClick={() => handleToggle(setOpenFS)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${openFS === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    File system
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {storageFS.map(tool => (
                                                    <ListItem key={tool.id_sto}>{tool.name_sto}</ListItem>
                                                ))}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>

                                    {/* Object store */}
                                    <Accordion open={openOS === true}>
                                        <ListItem className="p-0" selected={openOS} key="OS">
                                            <AccordionHeader onClick={() => handleToggle(setOpenOS)} className="border-b-0 p-3 flex items-center">
                                                <ListItemPrefix>
                                                    <ChevronRightIcon
                                                        strokeWidth={3}
                                                        className={`h-3 w-5 transition-transform ${openOS === true ? "rotate-90" : ""}`}
                                                    />
                                                </ListItemPrefix>
                                                <Typography color="blue-gray" className="mr-auto">
                                                    Object store
                                                </Typography>
                                            </AccordionHeader>
                                        </ListItem>
                                        <AccordionBody className="py-1">
                                            <List className="p-0 pl-4">
                                                {storageOS.map(tool => (
                                                    <ListItem key={tool.id_sto}>{tool.name_sto}</ListItem>
                                                ))}
                                            </List>
                                        </AccordionBody>
                                    </Accordion>

                                </List>
                            </AccordionBody>
                        </Accordion>

                        {/* others */}
                        <ListItem key="Frameworks">
                            <ListItemPrefix>
                                <InboxIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Frameworks
                        </ListItem>
                        <ListItem key="xxx">
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            xxx
                        </ListItem>
                    </List>
                </Card>
            </div>
        </div>
    )
}

export default ToolsSideBar