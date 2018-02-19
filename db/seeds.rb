# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'


Booking.delete_all
##Delete all cloudinary photos to avoid mess
Estate.all.each do |estate|
  estate.photos.each do |photo|
    Cloudinary::Api.delete_resources(photo.public_id)
  end
end
Estate.delete_all
User.delete_all

estates = [
  {
    name: 'Versailles',
    description: 'Palace france',
    photos: [
      'http://en.chateauversailles.fr/sites/default/files/styles/push_image/public/visuels_principaux/cour-de-marbre-vignette-youtube_0.jpg?itok=zPP_fomi',
      'http://www.icon-icon.com/sites/default/files/styles/image_detail/public/field/image/bloggif_592712ccebcad.jpeg?itok=Jeh6bysb'
    ]
  },
  {
    name: 'Buckinghma Palace',
    description: 'UK Palace',
    photos: [
      'https://www.royalcollection.org.uk/sites/default/files/styles/rctr-scale-crop-350-350/public/vimeo-square.jpg?itok=Za2nJpHz',
      'https://www.royalcollection.org.uk/sites/default/files/styles/rctr-scale-1010w/public/residence_teasers/bp-708.jpg?itok=U2HhJB3X'
    ]
  }
]

#Create a base user
new_user = User.create(
  email: 'fake@email.com',
  password: "123456"
)
#Create estates
estates.each do |estate|
  new_estate = Estate.new
  new_estate.description = estate[:description]
  new_estate.name = estate[:name]
  new_estate.user = new_user
  new_estate.save!
  new_estate.photo_urls = estate[:photos]
end

#Create bookings
estates = Estate.all
estates.each do |estate|
  new_booking = Booking.new
  new_booking.user = new_user
  new_booking.estate = estate
  new_booking.start_date = Date.today
  new_booking.end_date = Date.tomorrow
  new_booking.save!
end




