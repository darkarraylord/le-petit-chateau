class Estate < ApplicationRecord
  belongs_to :user
  has_many :bookings
  has_many :estate_amenities
  has_many :amenities, through: :estate_amenities
  has_attachments :photos, maximum: 50
end
