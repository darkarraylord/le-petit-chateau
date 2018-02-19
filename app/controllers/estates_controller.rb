class EstatesController < ApplicationController
  def index
    @estates = Estate.all
  end

  def show
    @estate = Estate.find(params[:id])
  end

  def new
    @estate = Estate.new
  end

  def create
    @estate = Estate.new(estate_params)
    @estate.user = current_user
    if @estate.save
      redirect_to estate_path(@estate)
    else
      render :new
    end
  end

  def edit
    @estate = Estate.find(params[:id])
  end

  def update
    @estate = Estate.find(params[:id])
    @estate.update(estate_params)
    redirect_to estate_path(@estate)
  end

  def destroy
    @estate = Estate.find(params[:id])
    @estate.destroy
    redirect_to estate_path
  end

  def disable
    @estate = Estate.find(params[:id])
    @estate.disable = true
  end

  private

  def estate_params
    params.require(:estate).permit(:name, :description, photos: [])
  end

end
