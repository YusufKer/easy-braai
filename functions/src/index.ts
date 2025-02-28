import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

export const createOrder = onCall(async (request) => {
  logger.info(request, { structuredData: true });

  // Check if user is authenticated
  if (!request.auth) {
    throw new Error(
      "unauthenticated: You must be logged in to place an order."
    );
  }

  const userId = request.auth.uid;
  const cart = request.data as Cart;

  if (!cart || cart.length === 0) {
    throw new Error("invalid-argument: Order must contain at least one item.");
  }

  const cuts: unknown[] = [];
  const flavours: unknown[] = [];

  // Use for...of instead of forEach
  for (const cartItem of cart) {
    if (!cartItem.plate || cartItem.plate.length === 0) {
      throw new Error(
        "invalid-argument: Order must contain at least one plate."
      );
    }

    for (const plateItem of cartItem.plate) {
      if (!plateItem.meat || !plateItem.cutID || !plateItem.flavourID) {
        throw new Error(
          "invalid-argument: Plate must contain meat, cutID, and flavourID."
        );
      }

      const cutRef = db.doc(`meats/${plateItem.meat}/cuts/${plateItem.cutID}`);
      const flavourRef = db.doc(
        `meats/${plateItem.meat}/flavours/${plateItem.flavourID}`
      );

      // Wait for Firestore queries
      const cutSnap = await cutRef.get();
      const flavourSnap = await flavourRef.get();

      if (cutSnap.exists) {
        cuts.push(cutSnap.data());
      } else {
        logger.warn(`Cut not found: ${plateItem.cutID}`);
      }

      if (flavourSnap.exists) {
        flavours.push(flavourSnap.data());
      } else {
        logger.warn(`Flavour not found: ${plateItem.flavourID}`);
      }

      console.log({ cut: cutSnap.data(), flavour: flavourSnap.data() });
    }
  }

  return { cuts, flavours, userId };
});

type Cart = CartItem[];

type CartItem = {
  plate: plateItem[];
  numberOfPlates: number;
  total: number;
};

type plateItem = {
  meat: string;
  cutID: string;
  flavourID: string;
};
/*

CART:

[
    {
        "plate": [
            {
                "meat": "beef",
                "cutID": "VZiHRL8JGhDAqj8D1Uns",
                "flavourID": "h5MZU2pISfpopJGza0F6"
            },
            {
                "meat": "lamb",
                "cutID": "8J5foGbEUPsU2Os5N3j2",
                "flavourID": "Ghbi01AyjqngvIX1Cx52"
            }
        ],
        "numberOfPlates": 1,
        "total": 30
    }
]


*/
