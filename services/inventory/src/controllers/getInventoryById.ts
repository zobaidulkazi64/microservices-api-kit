import {Request, Response, NextFunction} from 'express'
import prisma from "@/prisma";



const getInventoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get inventory
        const { id } = req.params
        const inventory = await prisma.inventory.findUnique({
            where: {
                id
            },
            select: {
                quantity: true
            }

            
        })
        // validation
        if(!inventory){
            return res.status(404).json({
                success: false,
                message: 'Inventory not found'
            })
        }

        // return inventory

        return res.status(200).json({
            success: true,
            data: inventory

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',   
        })
    }
}

export default getInventoryById;