class Facilitator < Faculty
  has_one :institution
  has_many :workshops, foreign_key: "facilitator_id"

  def facilitator?
    type == "Facilitator" && role == "Facilitator"
  end

end
