import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51TJXv5PeQ1hbwARsEyk2nRv1Na8e5jmkWMIPrELcPm57IWSWa9vIXzKQFp41UmUCwpQFetZgVDdTTV2VReoGfUjp00fqbBEv5J',
);

export default stripePromise;
