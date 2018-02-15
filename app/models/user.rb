class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook, :google, :twitter]

  enum role: [:faculty, :facilitator, :admin, :super_admin]
  after_initialize :set_default_role, if: :new_record?

  has_many :primary_contacts, class_name: "Consortium", foreign_key: "primary_contact_id"
  has_many :facilitators, class_name: "Facilitator"
  has_many :faculty, class_name: "Faculty"
  has_many :attendees, class_name: "Attendee"
  belongs_to :institution

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private
  def set_default_role
    self.role ||= :faculty
  end
end
