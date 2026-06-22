import Stripe from "stripe";
import * as Yup from "yup";

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc;
    }, 0);

    return total;
};

class CreatePaymentIntentController {
    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array()
                .required()
                .of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                        price: Yup.number().required(),
                    }),
                ),
        });

        try {
            // CORRIGIDO: de "request, body" para "request.body"
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { products } = request.body;

        const amount = calculateOrderAmount(products);

        try {
            // Instancia o Stripe aqui dentro garantindo que o process.env já está carregado
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'brl',
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            // Retorna a resposta de sucesso para o front-end
            return response.json({
                clientSecret: paymentIntent.client_secret,
                // Corrigido sutilmente o nome para bater exatamente com o que seu CheckoutForm espera (dpmCheckLink)
                dpmCheckLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
            });

        } catch (stripeError) {
            console.error("Erro ao criar Intent do Stripe:", stripeError.message);
            return response.status(500).json({ error: "Falha interna ao processar o pagamento com o Stripe." });
        }
    }
}

export default new CreatePaymentIntentController();
