module Api
  module V1
    class ConsortiaController < ApplicationController
      before_action :set_consortium, only: [:show, :edit, :update, :destroy]

      def index
        @consortia = Consortium.all
        render json: ConsortiumSerializer.new(@consortia).serialized_json
      end

      def show
        render json: ConsortiumSerializer.new(@consortium).serialized_json
      end

      def create
        @consortium = Consortium.new(consortium_params)

        if @consortium.save
          render json: @consortium, status: :created, location: @consortium
        else
          render json: @consortium.errors, status: :unprocessable_entity
        end
      end

      def update
        if @consortium.update(consortium_params)
          render json: @consortium, status: :ok, location: @consortium
        else
          render json: @consortium.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @consortium.destroy
      end

      private
        def set_consortium
          @consortium = Consortium.friendly.find(params[:id])
        end

        def consortium_params
          params.require(:consortium).permit(:name, :state)
        end
    end
  end
end
