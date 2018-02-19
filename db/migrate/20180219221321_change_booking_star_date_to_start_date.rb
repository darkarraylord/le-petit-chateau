class ChangeBookingStarDateToStartDate < ActiveRecord::Migration[5.1]
  def change
    rename_column :bookings, :star_date, :start_date
  end
end
