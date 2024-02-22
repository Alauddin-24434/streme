'use client'
import React from 'react';
import Layout from '../layout';
import MainNavbar from '@/components/MainNavbar/MainNavbar';

const page = () => {
    return (
        <Layout>
            
            <MainNavbar></MainNavbar>
            <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-slate-900 text-gray-800 ">

	
	<div class="flex flex-col flex-grow w-full max-w-xl bg-slate-950 shadow-xl rounded-lg overflow-hidden">
		<div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
			<div class="flex w-full mt-2 space-x-3 max-w-xs">
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
				<div>
					<div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p class="text-sm">Hi.</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">Hello.</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">How Are You?</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs">
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
				<div>
					<div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p class="text-sm">Fine, You? </p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">I'm Good, </p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">How can i help you</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">?</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs">
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
				<div>
					<div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p class="text-sm">I want to know about your company subscription policy. </p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">Ok sir, thanks for interest about our company. give me some times,</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs">
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
				<div>
					<div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p class="text-sm">How much time you need? </p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
			</div>
			<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p class="text-sm">Just 5 min sir..</p>
					</div>
					<span class="text-xs text-gray-500 leading-none">2 min ago</span>
				</div>
				<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
			</div>
		</div>
		
		<div class="bg-gray-300 p-4">
			<input class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…"/>
		</div>
	</div>
	

</div>
        </Layout>
    );
};

export default page;