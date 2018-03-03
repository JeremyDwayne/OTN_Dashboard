class Faculty < User
  has_one :institution
  has_many :attendees
  has_many :workshops, through: :attendees

  def faculty?
    type == "Faculty" && role == "Faculty"
  end

end

