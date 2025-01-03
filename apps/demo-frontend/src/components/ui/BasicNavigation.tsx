import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import { Button } from "./button";
// import { Button } from "./button";


const BasicNavigation: React.FC = () => {
    const appContext = useContext(AppContext);
    const baseUrl = appContext?.baseUrl;

    const { t, i18n } = useTranslation();


    // Language change handler
    const [language, setLanguage] = useState(i18n.language || "en");


    //Updated language selector to send the 
    //selected language to the server and refresh the content dynamically.
    const handleLanguageChange = async (lang: string) => {
        console.log(`Button clicked for language: ${lang}`); // Log button click
        setLanguage(lang);

        try {
            const response = await fetch('/v1/web*', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: lang }),
            });

            if (response.ok) {
                const { language: updatedLanguage } = await response.json();
                await i18n.changeLanguage(updatedLanguage);
                console.log(`Language changed to: ${updatedLanguage}`);
            } else {
                console.error('Failed to change language.');
            }
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };



    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <nav className="bg-black border-gray-200 dark:bg-gray-900 p-4">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <a href="/" className="flex items-center space-x-3">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Logo"
                        className="h-8"
                    />
                    <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
                        {t("demo")}
                    </span>
                </a>

                {/* Navigation Menu */}
                <NavigationMenu>
                    <NavigationMenuList className="text-black">
                        <NavigationMenuItem >
                            <NavigationMenuTrigger>{t("home")}</NavigationMenuTrigger>
                            <NavigationMenuContent className="block bg-gray-800 p-4">
                                <NavigationMenuLink href={`${baseUrl}`}>{t("home")}</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>{t("about")}</NavigationMenuTrigger>
                            <NavigationMenuContent className="block bg-gray-800 p-4">
                                <NavigationMenuLink href={`${baseUrl}/about`}>{t("about")}</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>{t("dashboard")}</NavigationMenuTrigger>
                            <NavigationMenuContent className="block bg-gray-800 p-4">
                                <NavigationMenuLink href={`${baseUrl}/dashboard`}>
                                    {t("dashboard")}
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>{t("nothing here")}</NavigationMenuTrigger>
                            <NavigationMenuContent className="block bg-gray-800 p-4">
                                <NavigationMenuLink href={`${baseUrl}/nothing-here`}>
                                    {t("nothing here")}
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Language Selector */}
                <div className="ml-4">
                    <Button onClick={() => {
                        console.log('English button clicked');
                        handleLanguageChange('en');
                    }}>
                        English
                    </Button>

                    <Button onClick={() => {
                        console.log('Spanish button clicked');
                        handleLanguageChange('es')
                    }}>
                        Spanish
                    </Button>

                    <Button onClick={() =>{
                        console.log('French button clicked');
                        handleLanguageChange('fr')
                    }}>French</Button>

                </div>
            </div>
        </nav>
    );
};

export default BasicNavigation;
