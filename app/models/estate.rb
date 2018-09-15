class Estate < ApplicationRecord
  belongs_to :user
  has_many :bookings
  has_many :estate_amenities, dependent: :destroy
  has_many :amenities, through: :estate_amenities
  has_one :owner, class_name: "User"
  has_attachments :photos, maximum: 50

  def dates_booked
    h = []
    h = bookings.map{ |booking| booking.start_date }
    self.bookings.each do |b_end_date|
      h << b_end_date.end_date
    end
    return h
  end

  def unavailable_dates
    dates_booked
  end

  private



end
