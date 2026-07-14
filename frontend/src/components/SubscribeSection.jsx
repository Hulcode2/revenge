import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SubscribeSection() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold">Never Miss a Deal!</h2>

        <p className="mt-4 text-gray-500">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts
        </p>

        <form className="mt-10 flex flex-col sm:flex-row items-center">
          <Input
            placeholder="Enter your email id"
            className="h-14 rounded-r-none rounded-l-xl text-base"
          />

          <Button className="h-14 bg-blue-500 hover:bg-blue-600 px-10 rounded-l-none rounded-r-xl w-full sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
