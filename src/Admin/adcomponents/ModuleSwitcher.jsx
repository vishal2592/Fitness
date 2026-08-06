import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    FaChevronDown,
    FaDumbbell
} from "react-icons/fa";

import {
    GiMeditation
} from "react-icons/gi";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    setMode
} from "../redux/modeSlice";



const modules = [
    {
        id: "gym",
        name: "Gym",
        icon: (
            <FaDumbbell 
                className="text-blue-600"
            />
        )
    },

    {
        id: "yoga",
        name: "Yoga",
        icon: (
            <GiMeditation 
                className="text-green-600"
            />
        )
    }
];



const ModuleSwitcher = () => {


    const dispatch = useDispatch();


    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );


    const [open, setOpen] = useState(false);


    const dropdownRef = useRef(null);



    const selectedModule =
        modules.find(
            (item) => item.id === currentMode
        ) || modules[0];




    useEffect(() => {


        const closeDropdown = (event) => {


            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ){

                setOpen(false);

            }

        };



        document.addEventListener(
            "mousedown",
            closeDropdown
        );



        return () => {

            document.removeEventListener(
                "mousedown",
                closeDropdown
            );

        };


    }, []);






    const handleSelect = (module) => {


        dispatch(
            setMode(module.id)
        );


        setOpen(false);

    };





    return (

        <div
            className="relative"
            ref={dropdownRef}
        >


            <button

                onClick={() => setOpen(!open)}

                className="
                    flex items-center gap-2
                    h-10 px-3
                    rounded-lg
                    border border-gray-200
                    bg-white
                    shadow-sm
                    hover:border-blue-500
                    transition

                    dark:bg-darkTheme-card
                    dark:border-darkTheme-border
                "

            >


                {selectedModule.icon}



                <span
                    className="
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-white
                    "
                >

                    {selectedModule.name}

                </span>



                <FaChevronDown

                    size={11}

                    className={`
                        transition-transform
                        duration-200

                        ${
                            open
                            ?
                            "rotate-180"
                            :
                            ""
                        }
                    `}

                />


            </button>






            {
                open && (

                    <div

                        className="
                            absolute
                            right-0
                            mt-2
                            w-40

                            rounded-xl

                            border
                            border-gray-200

                            bg-white

                            shadow-xl

                            dark:bg-darkTheme-card
                            dark:border-darkTheme-border

                            z-50

                            overflow-hidden
                        "

                    >


                        {
                            modules.map((module)=>(


                                <button

                                    key={module.id}


                                    onClick={() => 
                                        handleSelect(module)
                                    }


                                    className={`
                                        flex
                                        items-center
                                        gap-3

                                        w-full

                                        px-4
                                        py-3

                                        text-sm

                                        transition

                                        hover:bg-gray-100

                                        dark:hover:bg-darkTheme-border


                                        ${
                                            currentMode === module.id
                                            ?
                                            "bg-blue-50 dark:bg-darkTheme-border"
                                            :
                                            ""
                                        }

                                    `}

                                >


                                    {module.icon}



                                    <span
                                        className="
                                            font-medium
                                            text-gray-700
                                            dark:text-white
                                        "
                                    >

                                        {module.name}

                                    </span>


                                </button>


                            ))
                        }


                    </div>

                )
            }


        </div>

    );

};


export default ModuleSwitcher;