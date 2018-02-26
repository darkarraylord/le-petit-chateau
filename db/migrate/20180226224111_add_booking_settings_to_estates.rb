class AddBookingSettingsToEstates < ActiveRecord::Migration[5.1]
  def change
    add_column :estates, :minimum_reservation_span, :integer
    add_column :estates, :must_have_weekend, :boolean
  end
end
