SuperAdmin.create!([
  {email: "jeremy@jeremydwayne.com", password: "111111", first_name: "Jeremy", last_name: "Winterberg", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 0, current_sign_in_at: nil, last_sign_in_at: nil, current_sign_in_ip: nil, last_sign_in_ip: nil, provider: 'email', uid: "", institution_id: nil, role: "SuperAdmin", type: "SuperAdmin"}
])
u = User.first
u.set_role "SuperAdmin"
u.set_subclass
u.save

Consortium.create!([
  {name: "UW System", state: "WI", admin_id: User.first.id, slug: "uw-system"}
])
Institution.create!([
  {name: "UW Eau Claire", address_line_1: nil, address_line_2: nil, city: "Eau Claire", state: "WI", zip: 54703, consortium_id: Consortium.first.id, slug: "uw-eau-claire"}
])
Institution.create!([
  {name: "UW Madison", address_line_1: nil, address_line_2: nil, city: "Madison", state: "WI", zip: 54703, consortium_id: Consortium.first.id, slug: "uw-madison"}
])
Institution.create!([
  {name: "UW La Crosse", address_line_1: nil, address_line_2: nil, city: "La Crosse", state: "WI", zip: 54703, consortium_id: Consortium.first.id, slug: "uw-la-crosse"}
])
Workshop.create!([
  {name: "Testing Rails API with Angular Frontend", description: "A workshop to verify setting up a rails API works!", institution_id: Institution.first.id, additional_location_info: nil, starts_at: "2018-02-26 19:26:08", duration: nil, stipend_cents: 200, stipend_currency: "USD", sign_up_deadline: nil, attendee_limit: nil, review_deadline: "2018-03-10 19:26:08", facilitator_id: User.first.id, slug: "testing-rails-api-with-angular-frontend-26-feb-2018"}
])
