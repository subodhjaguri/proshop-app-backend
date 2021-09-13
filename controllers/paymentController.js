import Stripe from "stripe";
import asyncHandler from "express-async-handler";

const stripe = new Stripe(
  "sk_test_51JHAwGSGOR5MBcaj4JnqbipJsd6xWtSmmlF2AhRtGIpCYerEk0NTwW4iXZbNQjw8kNGdpCd2Zf05A0wev7QB7OHY00vNCJYUgt"
);

const paymentController = asyncHandler(async (req, res) => {
  console.log("card through api call", req.body);
  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: req.body.card,
  });

  try {
    let intent;
    if (paymentMethod.id) {
      intent = await stripe.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: req.body.amount,
        currency: "INR",
        // payment_method_types: ["card"],
        confirmation_method: "manual",
        confirm: true,
      });
    }
    //  else if (req.body.payment_intent_id) {
    //   intent = await stripe.paymentIntents.confirm(
    //     request.body.payment_intent_id
    //   );
    // }
    res.send(generateResponse(intent));
  } catch (error) {
    return res.send({ error: error.message });
  }
});

const generateResponse = (intent) => {
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === "requires_action" &&
    intent.next_action.type === "use_stripe_sdk"
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    };
  } else if (intent.status === "succeeded") {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true,
    };
  } else {
    // Invalid status
    return {
      error: "Invalid PaymentIntent status",
    };
  }
};

export { paymentController };
