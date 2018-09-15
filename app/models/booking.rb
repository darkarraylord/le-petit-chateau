class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :estate

  validates :start_date, uniqueness: true, presence: true
  validates :end_date, uniqueness: true, presence: true

  def overlaps?(booking)
    return true if booking.start_date.between?(self.start_date, self.end_date)
    return true if booking.end_date.between?(self.start_date, self.end_date)
    return true if booking.start_date < self.start_date && booking.end_date > self.end_date
    false
  end

end
