class FacilitatorSerializer < UserSerializer
  set_type :facilitator
  has_one :institution, serializer: :institution
  has_many :workshops, foreign_key: "facilitator_id", serializer: :institution
  attributes :first_name, :last_name, :email, :institution_id, :role
end
