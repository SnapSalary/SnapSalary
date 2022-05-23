
import React from 'react';

export function SiteFooter() {
  return (
    <div className="absolute bottom-0 absolute w-full bg-gray-100 text-center lg:text-left">
      <div className="container p-6 text-gray-800">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="mb-6 md:mb-0">
            <h5 className="font-medium mb-2 uppercase">Contribute</h5>

            <p className="mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae
                            aliquam voluptatem veniam, est atque cumque eum delectus sint!
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="font-medium mb-2 uppercase">Community</h5>

            <p className="mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae
                            aliquam voluptatem veniam, est atque cumque eum delectus sint!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-700 p-4">
                © 2022 Copyright:
        <a className="text-gray-800" href="https://tailwind-elements.com/"> Snap Salary</a>
      </div>
    </div>
  );
}

