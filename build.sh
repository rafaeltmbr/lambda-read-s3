printf "1 - Prepare the build folder\n"
rm -rf build
mkdir build

printf "\n2 - Build the source code\n"
yarn tsc

printf "\n3 - Copy the production files\n"
cp package.json yarn.lock build

printf "\n4 - Install the production dependencies\n"
cd build
yarn --production
cd ..

printf "\n5 - Package the project for production\n"
sam build