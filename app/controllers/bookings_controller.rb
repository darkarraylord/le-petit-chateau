class BookingsController < ApplicationController
  def index
    @bookings = Booking.all
  end

  def show
    @booking = Booking.find(params[:id])
  end

  def new
    @estate = Estate.find(params[:estate_id])
    @booking = Booking.new
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.user = current_user
    @booking.estate = Estate.find(params[:estate_id])
    if @booking.save
      redirect_to :root
    else
      :new
    end

  end

  private

  def booking_params
    params.require(:booking).permit(:user, :estate, :star_date, :end_date)
  end

end
