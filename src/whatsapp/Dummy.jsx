import { Button } from 'flowbite-react'
import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { Accordion } from "flowbite-react";


const Dummy = () => {

    return (
        <>
            {/* <div className='h-screen bg-white'>
                <Sidebar aria-label="Sidebar with multi-level dropdown example" className='' >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                                <Sidebar.Item href="#">Products</Sidebar.Item>
                                <Sidebar.Item href="#">Sales</Sidebar.Item>
                                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                                <Sidebar.Item href="#">Shipping</Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                                <Sidebar.Item href="#">Products</Sidebar.Item>
                                <Sidebar.Item href="#">Sales</Sidebar.Item>
                                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                                <Sidebar.Item href="#">Shipping</Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Item href="#" icon={HiInbox}>
                                Inbox
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiShoppingBag}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>

            </div> */}
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>What is Flowbite?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                            dropdowns, modals, navbars, and more.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out this guide to learn how to&nbsp;
                            <a
                                href="https://flowbite.com/docs/getting-started/introduction/"
                                className="text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                get started&nbsp;
                            </a>
                            and start developing websites even faster with components on top of Tailwind CSS.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Is there a Figma file available?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
                            has a design equivalent in our Figma file.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out the
                            <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                Figma design system
                            </a>
                            based on the utility classes from Tailwind CSS and components from Flowbite.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
                            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
                            components, whereas Tailwind UI offers sections of pages.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
                            technical reason stopping you from using the best of two worlds.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                        <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                            <li>
                                <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                    Flowbite Pro
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://tailwindui.com/"
                                    rel="nofollow"
                                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    Tailwind UI
                                </a>
                            </li>
                        </ul>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

        </>
    )
}

export default Dummy