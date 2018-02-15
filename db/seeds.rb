# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

 # => User(id: integer, email: string, encrypted_password: string, first_name: string, last_name: string, reset_password_token: string, reset_password_sent_at: datetime, remember_created_at: datetime, sign_in_count: integer, current_sign_in_at: datetime, last_sign_in_at: datetime, current_sign_in_ip: string, last_sign_in_ip: string, provider: string, uid: string, role: integer, created_at: datetime, updated_at: datetime, institution_id: integer)

#  => Consortium(id: integer, name: string, state: string, primary_contact: integer, created_at: datetime, updated_at: datetime)

Consortium.create(name: "UW System", state: "Wisconsin", primary_contact_id: User.first.id)

 # => Institution(id: integer, name: string, address_line_1: string, address_line_2: string, city: string, state: string, zip: integer, consortium_id: integer, created_at: datetime, updated_at: datetime)

Institution.create(name: "UW Eau Claire", city: "Eau Claire", state: "Wisconsin", zip: 54703, consortium_id: Consortium.first.id)

 # => Workshop(id: integer, name: string, description: string, institution_id: integer, additional_location_info: string, starts_at: datetime, duration: float, stipend: float, sign_up_deadline: datetime, attendee_limit: integer, review_deadline: string, facilitator_id: integer, created_at: datetime, updated_at: datetime)

Workshop.create(name: "Test Workshop", description: "The very first workshop", institution_id: Institution.first.id, facilitator_id: User.first.id)

