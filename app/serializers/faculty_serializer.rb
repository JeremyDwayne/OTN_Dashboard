class FacultySerializer
  include FastJsonapi::ObjectSerializer

  attributes :first_name, :last_name, :email
  has_one :institution, serializer: :institution
  has_many :attendees
  has_many :workshops, through: :attendees, serializer: :workshop
  
end
