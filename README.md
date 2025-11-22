# Stock_management
# StockMaster - Inventory Management System

StockMaster is a modular, real-time Inventory Management System (IMS) designed to digitize and streamline stock tracking and operations for businesses. It replaces manual registers, Excel sheets, and scattered tracking processes with a centralized, easy-to-use application tailored for inventory managers and warehouse staff.

## Features

- User Authentication using Flask with username/password login and OTP-based password reset
- Real-time Inventory Dashboard showing:
  - Total Products in Stock
  - Low Stock / Out of Stock Alerts
  - Pending Receipts and Deliveries
  - Scheduled Internal Transfers
- Product Management: Create, update, and categorize products and track stock levels per location
- Stock Receipts: Manage incoming goods and update inventory automatically
- Delivery Orders: Process outgoing stock for customer shipments with pick-pack-validate workflow
- Internal Transfers: Transfer stock between warehouses or locations and track movements
- Stock Adjustments: Adjust for damaged or lost stock with logging and reconciliation
- Comprehensive stock ledger showing all stock movements and adjustments
- Dynamic filtering by document type, product category, location, and transaction status
- Real time interactive dashboard
- Bright Neon alert system with wattsapp notifications
- Modular and flexible for any business and scale
- Real time transfer tracking with map
- Expiry and QR tracking

## Technology Stack

- Backend: Typescript(React)
- Database: Supabase (document-oriented, flexible schema)
- Frontend: Flask Templates (Jinja2) with HTML, CSS, and JavaScript
- Authentication: Custom-built with Flask, featuring username/password login and OTP password reset
