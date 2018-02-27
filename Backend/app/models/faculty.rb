class Faculty < User
  has_one :institution
  has_many :workshops, through: :attendees
  has_many :attendees

  def faculty?
    type == "Faculty" && role == "Faculty"
  end

end

