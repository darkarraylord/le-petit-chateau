class Amenity < ApplicationRecord
  has_many :estate_amenities
  has_many :estates, through: :estate_amenities
  validates :title, presence: true, uniqueness: true
end
