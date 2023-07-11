import prisma from '@/app/libs/prismadb';

import { NextResponse } from 'next/server'; 
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId,
        startData,
        endDate,
        totalPrice
    } = body;

    if(!listingId || !startData || !endDate || !totalPrice) {
        return NextResponse.error()
    }
    const listingAndReservation = await prisma.listing.update({
        where:{
            id: listingId
        },
        data: {
            reservation: {
                create:{
                    userId: currentUser.id,
                    startData,
                    endDate,
                    totalPrice
                }
            }
        }
    })
    return NextResponse.json(listingAndReservation)
}