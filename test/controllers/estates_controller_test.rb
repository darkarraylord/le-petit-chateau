require 'test_helper'

class EstatesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get estates_index_url
    assert_response :success
  end

  test "should get show" do
    get estates_show_url
    assert_response :success
  end

end
