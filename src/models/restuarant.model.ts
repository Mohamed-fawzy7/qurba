import mongoose, { Document } from 'mongoose';

export interface RestuarantInput {
  name: string;
  cuisine: string;
  owner: string;
  longitude: number;
  latitude: number;
  slug?: string;
}

export interface RestuarantDocument extends RestuarantInput, Document {
  name: string;
  slug: string;
  cuisine: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantFilters {
  _id?: string;
  slug?: string;
  cuisine?: string;
}

export interface RestaurantNearbyOptions {
  longitude: number;
  latitude: number;
  maxDistance: number;
}

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  //coordinates = [longitude, latitude]
  coordinates: {
    type: [Number],
    required: true,
  },
});

const RestuarantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    location: {
      type: pointSchema,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: 'true',
    },
  },
  { timestamps: true }
);

RestuarantSchema.index({ location: '2dsphere' });

const RestuarantModel = mongoose.model('Restuarant', RestuarantSchema);

export default RestuarantModel;
