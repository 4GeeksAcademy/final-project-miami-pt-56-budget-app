import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-1 text-center">
		<div className="container">
		<p className="m-1">&copy; {new Date().getFullYear()} BetterBudget </p>
		</div>
	</footer>
);
