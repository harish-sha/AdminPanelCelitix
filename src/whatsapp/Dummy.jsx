import { Button } from 'flowbite-react'
import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";


const Dummy = () => {
    return (
        <div className='h-screen bg-white'>
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

        </div>
    )
}

export default Dummy