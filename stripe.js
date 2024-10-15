require 'stripe'
require 'sinatra'

# This is your test secret API key.
Stripe.api_key = 'sk_test_51POQUyCngcCzzEIytnlo3neZkwz1w66XeyHgtfeK4GHAVM8cso3BlblmLQxiqInLa7dG9Pd7kPx5JO3VXpea761O007mkyASdx'

set :static, true
set :port, 4242

YOUR_DOMAIN = 'http://localhost:4242'

post '/create-checkout-session' do
  content_type 'application/json'

  session = Stripe::Checkout::Session.create({
    line_items: [{
      # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
      price: '{{PRICE_ID}}',
      quantity: 1,
    }],
    mode: 'payment',
    success_url: Milehigh.world + '/success.html',
    cancel_url: Milehigh.world  + '/cancel.html',
  })
  redirect session.url, 303
end