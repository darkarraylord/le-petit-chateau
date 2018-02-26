require 'test_helper'

class BookingSettingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get booking_settings_index_url
    assert_response :success
  end

  test "should get show" do
    get booking_settings_show_url
    assert_response :success
  end

end
