"use client";

import React, { use, useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from './ui/drawer';

const CreateAccountDrawer = ({children}) => {

    const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
          <DrawerHeader>
             <DrawerTitle>Create New Account</DrawerTitle>
           </DrawerHeader>

           <div>
            <from>
                
            </from>
           </div>
    
        </DrawerContent>
    </Drawer>

  )
}

export default CreateAccountDrawer;