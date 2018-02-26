class CreateBookingSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :booking_settings do |t|
      t.references :estate, foreign_key: true
      t.integer :minimum_reservation_span
      t.boolean :must_have_weekend

      t.timestamps
    end
  end
end
