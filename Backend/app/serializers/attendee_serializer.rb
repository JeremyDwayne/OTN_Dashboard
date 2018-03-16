class AttendeeSerializer < UserSerializer
  set_type :attendee

  belongs_to :faculty, serializer: :faculty
  belongs_to :workshop, serializer: :workshop
end
