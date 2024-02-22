class Api::V1::Admin::ProductsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_product, only: %i[show update destroy]

  def index
    @products = current_api_v1_user.products
    if @products
      render json: { status: 'SUCCESS', products: @products, message: 'Successfully to to get the products' }
    else
      render json: { status: 'Failed', message: 'No products' }
    end
  end

  def show
    if @product
      render json: { status: 'Success', message: 'Successfully found the product', product: @product }
    else
      render json: { status: 'Failed', message: 'No product' }
    end
  end

  def create
    product = Product.new(product_params)
    product.user_id = current_api_v1_user.id
    puts '---------------------------------'
    puts params[:img_urls].present?
    if product.save
      if params[:img_urls].present?
        params[:img_urls].each do |url|
          product.images.create(img_url: url)
        end
      end
      render json: { status: 'Success', product: }
    else
      render json: { status: 'Failed' }
    end
  end

  def update
    if @product.user_id != current_api_v1_user.id
      render json: { status: 'Failed', message: 'No right to uodate this product' }
    elsif @product.update(product_params)
      render json: { status: 'Success', message: 'Successfully updated product' }
    else
      render json: { status: 'Failed', message: 'Failed to delete product' }
    end
  end

  def destroy
    if @product.user_id != current_api_v1_user.id
      render json: { status: 'Failed', message: 'No right to delete this product' }
    elsif @product.destroy
      render json: { status: 'Success', message: 'Successfully deleted product' }
    else
      render json: { status: 'Failed', message: 'Failed to delete product' }
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { status: 'Failed', message: 'No product found' }, status: :not_found
  end

  def product_params
    params.require(:product).permit(:name, :amount, :price, :img_urls)
  end
end
