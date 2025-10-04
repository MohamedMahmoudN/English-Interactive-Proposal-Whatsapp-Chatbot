"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  Download,
  Zap,
  Shield,
  BarChart3,
  Users,
  Calendar,
  FileText,
  Rocket,
  Headphones,
  Code,
  MessageCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  deliveryDays: number
  icon: any
  note?: string
  tooltip?: string
}

interface ClientInfo {
  name: string
  email: string
  phone: string
  company: string
  website: string
  notes: string
}

// Telegram Configuration
const TELEGRAM_CONFIG = {
  BOT_TOKEN: "8171309840:AAGwFKgF-XqYLEhOVmd7L1Zp9Q8oCawC3CU",
  CHAT_ID: "5239661627",
  ENABLED: true,
}

const addOns: AddOn[] = [
  {
    id: "expedited",
    name: "Expedited Delivery (3 Days)",
    description: "Fast-track your project with priority deployment in just 3 business days",
    price: 250,
    deliveryDays: -7,
    icon: Rocket,
    tooltip: "Get your system up and running in record time",
  },
  {
    id: "consultation",
    name: "Extended Consultation (5 Hours)",
    description: "Additional hands-on support for customization and optimization",
    price: 200,
    deliveryDays: 0,
    icon: Headphones,
    note: "Includes workflow customization and team training",
    tooltip: "Perfect for teams needing extra guidance",
  },
  {
    id: "custom_workflow",
    name: "Custom Workflow Development",
    description: "Build a tailored workflow specific to your business needs",
    price: 350,
    deliveryDays: 5,
    icon: Code,
    tooltip: "Fully custom automation designed for your use case",
  },
  {
    id: "voice_upgrade",
    name: "Premium Voice Package",
    description: "Professional voice cloning and multi-voice support with ElevenLabs Pro",
    price: 150,
    deliveryDays: 2,
    icon: MessageCircle,
    note: "Requires ElevenLabs Pro subscription ($99/month)",
    tooltip: "Create branded voice experiences for your customers",
  },
]

const COUPONS = {
  EARLYBIRD: { discount: 0.15, description: "15% discount for early adopters" },
  AGENCY20: { discount: 0.2, description: "20% agency partner discount" },
}

export default function WhatsAppAIProposalPage() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "Jousef Murad",
    email: "",
    phone: "",
    company: "AI Automation Agency",
    website: "",
    notes: "",
  })
  const [showPreview, setShowPreview] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [couponError, setCouponError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const basePrice = 750
  const baseDeliveryDays = 10

  const calculateTotals = () => {
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id)
      return sum + (addOn?.price || 0)
    }, 0)

    const hasAddOnDiscount = selectedAddOns.length >= 2
    const addOnDiscount = hasAddOnDiscount ? addOnTotal * 0.1 : 0
    const addOnTotalAfterDiscount = addOnTotal - addOnDiscount

    // Apply coupon discount ONLY to the base package
    const basePriceAfterCoupon = appliedCoupon ? basePrice * (1 - appliedCoupon.discount) : basePrice
    const couponDiscount = appliedCoupon ? basePrice * appliedCoupon.discount : 0

    const finalTotal = basePriceAfterCoupon + addOnTotalAfterDiscount

    // Calculate delivery days
    const addOnsDaysChange = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((a) => a.id === id)
      return sum + (addOn?.deliveryDays || 0)
    }, 0)

    const totalDeliveryDays = Math.max(1, baseDeliveryDays + addOnsDaysChange)

    return {
      originalTotal: basePrice + addOnTotal,
      addOnDiscount,
      couponDiscount,
      finalTotal,
      totalDeliveryDays,
      hasAddOnDiscount,
    }
  }

  const applyCoupon = () => {
    const upperCaseCode = couponCode.toUpperCase().trim()

    if (!upperCaseCode) {
      setCouponError("Please enter a coupon code")
      return
    }

    const coupon = COUPONS[upperCaseCode as keyof typeof COUPONS]

    if (!coupon) {
      setCouponError("Invalid coupon code")
      return
    }

    if (appliedCoupon?.code === upperCaseCode) {
      setCouponError("This coupon has already been applied")
      return
    }

    setAppliedCoupon({ code: upperCaseCode, discount: coupon.discount })
    setCouponError("")
    setCouponCode("")

    setShowSuccessModal(true)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError("")
  }

  const { originalTotal, addOnDiscount, couponDiscount, finalTotal, totalDeliveryDays, hasAddOnDiscount } =
    calculateTotals()

  const getEstimatedDate = () => {
    const today = new Date()
    const estimatedDate = new Date(today.getTime() + totalDeliveryDays * 24 * 60 * 60 * 1000)
    return estimatedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const sendProposalDetailsToTelegram = async () => {
    if (!TELEGRAM_CONFIG.ENABLED || !TELEGRAM_CONFIG.BOT_TOKEN || !TELEGRAM_CONFIG.CHAT_ID) {
      console.log("Telegram integration disabled or not configured")
      return
    }

    try {
      const separator = "━".repeat(50)

      const proposalMessage = `🤖 New WhatsApp AI System Proposal!

${separator}

👤 CLIENT INFORMATION:
• Name: ${clientInfo.name || "Not specified"}
• Email: ${clientInfo.email || "Not specified"}
• Phone: ${clientInfo.phone || "Not specified"}
• Company: ${clientInfo.company || "Not specified"}
• Website: ${clientInfo.website || "Not specified"}
${clientInfo.notes ? `• Notes: ${clientInfo.notes}` : ""}

${separator}

💰 PROPOSAL DETAILS:
• Base Package: $${basePrice}
${
  selectedAddOns.length > 0
    ? selectedAddOns
        .map((id) => {
          const addOn = addOns.find((a) => a.id === id)
          return `• ${addOn?.name}: $${addOn?.price}`
        })
        .join("\n")
    : "• No add-ons selected"
}

${hasAddOnDiscount ? `🎉 Bundle Discount (10%): -$${Math.round(addOnDiscount)}` : ""}
${appliedCoupon ? `🎫 Coupon ${appliedCoupon.code} (${Math.round(appliedCoupon.discount * 100)}%): -$${Math.round(couponDiscount)}` : ""}

💲 FINAL TOTAL: $${finalTotal}
💳 Payment Terms: $500 upfront + $${finalTotal - 500} after successful deployment
⏰ Delivery Time: ${totalDeliveryDays} business days
📅 Expected Completion: ${getEstimatedDate()}

${separator}

📱 Created: ${new Date().toLocaleString("en-US")}`

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.CHAT_ID,
          text: proposalMessage,
          parse_mode: "HTML",
        }),
      })

      if (response.ok) {
        console.log("Proposal sent to Telegram successfully!")
      } else {
        const error = await response.text()
        console.error("Failed to send to Telegram:", error)
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error)
    }
  }

  const generatePDF = async () => {
    try {
      await sendProposalDetailsToTelegram()

      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        alert("Please allow pop-ups to download the proposal")
        return
      }

      const pdfContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WhatsApp AI System Proposal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #25D366;
            padding-bottom: 20px;
        }
        
        .header h1 {
            color: #25D366;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            color: #666;
            font-size: 16px;
        }
        
        .section {
            margin-bottom: 30px;
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .section h2 {
            color: #1e40af;
            font-size: 22px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
        }
        
        .client-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 100px;
        }
        
        .info-value {
            color: #4b5563;
        }
        
        .package-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: white;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid #e2e8f0;
        }
        
        .package-name {
            font-weight: 600;
            color: #374151;
        }
        
        .package-price {
            font-weight: 700;
            color: #25D366;
            font-size: 18px;
        }
        
        .discount {
            color: #dc2626;
            font-weight: 600;
        }
        
        .total {
            background: #25D366;
            color: white;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
        }
        
        .payment-info {
            background: #3b82f6;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            margin: 15px 0;
        }
        
        .delivery-info {
            background: #10b981;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
        }
        
        .features {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 20px;
        }
        
        .feature {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 12px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        
        .feature-icon {
            width: 8px;
            height: 8px;
            background: #25D366;
            border-radius: 50%;
            margin-top: 6px;
            flex-shrink: 0;
        }
        
        .prerequisites {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #f59e0b;
        }
        
        .prerequisites h3 {
            color: #92400e;
            margin-bottom: 15px;
        }
        
        .prerequisites ul {
            color: #78350f;
            font-size: 14px;
            line-height: 1.8;
            list-style: none;
            padding: 0;
        }
        
        .prerequisites li {
            margin-bottom: 8px;
        }
        
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #6b7280;
            border-top: 2px solid #e5e7eb;
            padding-top: 20px;
        }
        
        @media print {
            body {
                padding: 0;
            }
            .section {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 WhatsApp AI Customer Service System</h1>
        <p>Complete n8n Workflow Package - Production-Ready Solution</p>
    </div>

    <div class="section">
        <h2>👤 Client Information</h2>
        <div class="client-info">
            <div class="info-item">
                <span class="info-label">Name:</span>
                <span class="info-value">${clientInfo.name || "Not specified"}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${clientInfo.email || "Not specified"}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Phone:</span>
                <span class="info-value">${clientInfo.phone || "Not specified"}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Company:</span>
                <span class="info-value">${clientInfo.company || "Not specified"}</span>
            </div>
            ${
              clientInfo.website
                ? `
            <div class="info-item">
                <span class="info-label">Website:</span>
                <span class="info-value">${clientInfo.website}</span>
            </div>
            `
                : ""
            }
            ${
              clientInfo.notes
                ? `
            <div class="info-item" style="grid-column: 1 / -1;">
                <span class="info-label">Notes:</span>
                <span class="info-value">${clientInfo.notes}</span>
            </div>
            `
                : ""
            }
        </div>
    </div>

    <div class="section">
        <h2>📦 Proposal Details</h2>
        <div class="package-item">
            <div class="package-name">Base Package - Complete WhatsApp AI System (5 Workflows)</div>
            <div class="package-price">$${basePrice}</div>
        </div>
        
        ${
          selectedAddOns.length > 0
            ? selectedAddOns
                .map((id) => {
                  const addOn = addOns.find((a) => a.id === id)
                  return `
          <div class="package-item">
              <div class="package-name">${addOn?.name}</div>
              <div class="package-price">$${addOn?.price}</div>
          </div>
          `
                })
                .join("")
            : ""
        }

        ${
          hasAddOnDiscount
            ? `
        <div class="package-item">
            <div class="package-name discount">Bundle Discount (10%)</div>
            <div class="package-price discount">-$${Math.round(addOnDiscount)}</div>
        </div>
        `
            : ""
        }

        ${
          appliedCoupon
            ? `
        <div class="package-item">
            <div class="package-name discount">Coupon ${appliedCoupon.code} (${Math.round(appliedCoupon.discount * 100)}%)</div>
            <div class="package-price discount">-$${Math.round(couponDiscount)}</div>
        </div>
        `
            : ""
        }

        <div class="total">
            TOTAL INVESTMENT: $${finalTotal}
        </div>

        <div class="payment-info">
            💳 Payment Terms: $500 upfront + $${finalTotal - 500} after successful deployment & testing
        </div>

        <div class="delivery-info">
            ⏰ Timeline: ${totalDeliveryDays} business days | 📅 Expected Completion: ${getEstimatedDate()}
        </div>
    </div>

    <div class="section">
        <h2>✨ What's Included in the Base Package</h2>
        <div class="features">
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>🧠 AI-Powered Smart Agent (Gemini + RAG):</strong> Responds to customer inquiries with accuracy based on your website content and documents. Includes context-aware conversation memory and multi-turn dialogue handling.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>📝 Intelligent Response Customization:</strong> Concise, clear answers with the ability to expand upon request. The system adapts response length based on customer engagement patterns.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>🤖 Self-Learning & Monitoring:</strong> The system automatically learns from your corrections and improves over time. Includes confidence scoring and quality metrics tracking.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>📁 Easy Knowledge Updates:</strong> Simply upload new documents to Google Drive for automatic bot training. Supports PDFs, Word docs, text files, and more with automatic embedding generation.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>🌍 Multi-Language Support:</strong> Automatically detects customer language and responds accordingly. Specialized support for Arabic (Hijazi dialect) and English with cultural context awareness.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>💬 Human-Like Behavior Simulation:</strong> Displays "typing..." or "recording audio" indicators and responds with natural interaction patterns to create authentic conversations.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>📊 Conversation Management Dashboard (CRM):</strong> Monitor conversations, assign tasks, respond manually, and manage customer interactions professionally through an integrated interface.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>🛠️ Complete Setup on Your Infrastructure:</strong> Includes n8n installation, response dashboard setup, SSL certificate activation, and full deployment on your hosting environment.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>📡 Official WhatsApp Business API Integration:</strong> Connected through Meta's official API for reliable, compliant automated responses and customer follow-ups with delivery receipts and read status.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>📣 Smart Alert System:</strong> Automatic notifications when the bot cannot respond or when human intervention is needed. Includes Telegram integration for real-time admin alerts.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>🧑‍🏫 Human-in-the-Loop Review (First Week):</strong> Every response passes through you before sending during the learning phase, then transitions to monitoring-only for special cases with confidence-based escalation.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>✅ No Ongoing Operational Costs:</strong> Uses free Gemini API and you only pay for outgoing messages based on your actual usage through Meta's official pricing. No hidden subscription fees.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>🎤 Voice Message Processing:</strong> Understands and transcribes customer voice messages automatically using Google's speech-to-text with support for multiple dialects and accents.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>⚡ Production-Grade Architecture:</strong> Includes PostgreSQL message queuing to prevent race conditions, anti-collision logic for rapid messages, and robust error recovery with retry mechanisms.</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>📈 Smart Follow-Up Automation:</strong> Automatically re-engages silent customers with personalized messages, respects business hours, and prevents duplicate follow-ups with conversation context awareness.</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🚀 5 Complete n8n Workflows (227 Nodes Total)</h2>
        <div class="features">
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>Main AI Agent Workflow:</strong> Core conversation handling with multi-language support, context memory, and intelligent response generation</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>Smart Follow-Up System:</strong> Automated lead nurturing with silent customer detection, business hours awareness, and personalized re-engagement</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>Human-in-the-Loop Manager:</strong> Seamless escalation handling, admin notifications, and learning from human feedback</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>Escalation Handler:</strong> Confidence-based routing for complex conversations requiring human expertise</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span><strong>Vector Knowledge Base Engine:</strong> Real-time Google Drive monitoring with automatic content updates and embedding generation</span>
            </div>
        </div>
    </div>

    <div class="section prerequisites">
        <h2>📋 Prerequisites to Get Started</h2>
        <ul>
            <li>• n8n instance (self-hosted or cloud) - We'll guide you through setup if needed</li>
            <li>• PostgreSQL database - Can be installed on your VPS or use managed service</li>
            <li>• Chatwoot installation - For WhatsApp Business API integration and conversation management</li>
            <li>• Google Cloud account - For Gemini API access (free tier available with generous limits)</li>
            <li>• WhatsApp Business API access - Through Meta or Chatwoot's official integration</li>
            <li>• VPS or hosting environment - Minimum 4GB RAM, 2 CPU cores recommended</li>
            <li>• Domain name with SSL certificate - For secure webhook connections</li>
            <li>• Optional: ElevenLabs account for voice synthesis (if voice features are needed)</li>
        </ul>
    </div>

    <div class="section">
        <h2>📋 Important Notes</h2>
        <div class="features">
            <div class="feature">
                <div class="feature-icon"></div>
                <span>This is a production-ready system tested with real customers in live business environments</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span>Workflows require some customization for your specific business requirements and processes</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span>Technical knowledge of n8n and related services is recommended for optimal setup and maintenance</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span>System uses official Meta WhatsApp Business API for compliance and stability</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span>Includes comprehensive documentation, setup guides, and deployment checklist</span>
            </div>
            <div class="feature">
                <div class="feature-icon"></div>
                <span>Suitable for small to medium-sized businesses with prospects for scaling</span>
            </div>
        </ul>
    </div>

    <div class="footer">
        <p>Proposal created: ${new Date().toLocaleString("en-US")}</p>
        <p>This proposal is valid for 30 days from the creation date</p>
        <p style="margin-top: 10px; font-weight: 600;">Payment Method: PayPal Available</p>
    </div>
</body>
</html>
      `

      printWindow.document.write(pdfContent)
      printWindow.document.close()

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 500)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const handleInputChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-green-600 rounded-full mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">WhatsApp AI Customer Service System</h1>
          <p className="text-xl text-gray-600">Complete n8n Workflow Package - Production-Ready AI Automation</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={clientInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={clientInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <Input
                  placeholder="Phone Number"
                  value={clientInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <Input
                  placeholder="Company Name"
                  value={clientInfo.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
                <Input
                  placeholder="Website (optional)"
                  value={clientInfo.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                />
                <Textarea
                  placeholder="Additional Notes"
                  value={clientInfo.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Package Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Base Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-green-900">Complete WhatsApp AI System</h3>
                    <p className="text-sm text-green-700">
                      5 Production-Ready n8n Workflows + Documentation + Setup Support
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${basePrice}</div>
                    <div className="text-sm text-green-600 flex items-center gap-1 justify-end">
                      <Clock className="h-4 w-4" />
                      {baseDeliveryDays} days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Optional Add-Ons
                  {hasAddOnDiscount && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save 10%
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addOns.map((addOn) => {
                  const Icon = addOn.icon
                  const isSelected = selectedAddOns.includes(addOn.id)

                  return (
                    <div
                      key={addOn.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox checked={isSelected} readOnly className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold">{addOn.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{addOn.description}</p>
                          {addOn.note && <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">{addOn.note}</p>}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">${addOn.price}</div>
                          {addOn.deliveryDays !== 0 && (
                            <div className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                              <Clock className="h-3 w-3" />
                              {addOn.deliveryDays > 0 ? `+${addOn.deliveryDays}d` : `${addOn.deliveryDays}d`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Proposal Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Base Package</span>
                    <span className="font-semibold">${basePrice}</span>
                  </div>

                  {selectedAddOns.map((id) => {
                    const addOn = addOns.find((a) => a.id === id)
                    return (
                      <div key={id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>{addOn?.name}</span>
                        <span className="font-semibold">${addOn?.price}</span>
                      </div>
                    )
                  })}

                  {hasAddOnDiscount && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg text-green-700">
                      <span>Bundle Discount (10%)</span>
                      <span className="font-semibold">-${Math.round(addOnDiscount)}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg text-green-700">
                      <span>Coupon Discount ({Math.round(appliedCoupon!.discount * 100)}%)</span>
                      <span className="font-semibold">-${Math.round(couponDiscount)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                <div className="space-y-3">
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value)
                          setCouponError("")
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border border-green-300">
                      <div>
                        <span className="font-semibold text-green-800">Coupon: {appliedCoupon.code}</span>
                        <div className="text-sm text-green-600">
                          {COUPONS[appliedCoupon.code as keyof typeof COUPONS]?.description}
                        </div>
                      </div>
                      <Button
                        onClick={removeCoupon}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  )}

                  {couponError && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{couponError}</div>}
                </div>

                <Separator />

                {/* Delivery Info */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">Delivery Information</span>
                  </div>
                  <div className="text-sm text-green-600 space-y-1">
                    <div>Timeline: {totalDeliveryDays} business days</div>
                    <div>Expected Completion: {getEstimatedDate()}</div>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Investment</span>
                  <span className="text-green-600">${finalTotal}</span>
                </div>

                {/* Payment Info */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <span className="font-semibold">💳 Payment Terms</span>
                  </div>
                  <div className="text-sm text-blue-600 space-y-1">
                    <div>Upfront: $500</div>
                    <div>After Deployment: ${finalTotal - 500}</div>
                    <div className="pt-2 border-t border-blue-200">Method: PayPal Available</div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">What's Included</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      "5 Complete n8n Workflows (227 nodes)",
                      "Multi-language AI agent (Arabic + English)",
                      "Smart follow-up automation",
                      "Human-in-the-loop system",
                      "Vector knowledge base",
                      "Voice message processing",
                      "PostgreSQL message queuing",
                      "Official WhatsApp Business API",
                      "CRM dashboard integration",
                      "Complete documentation",
                      "Setup & deployment support",
                      "No ongoing operational costs",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 py-1">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-xs leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">📋 Prerequisites</h4>
                  <div className="text-sm text-amber-700 space-y-1">
                    <div>• n8n instance (self-hosted or cloud)</div>
                    <div>• PostgreSQL database</div>
                    <div>• Chatwoot installation</div>
                    <div>• Google Cloud account (Gemini API)</div>
                    <div>• WhatsApp Business API access</div>
                    <div>• VPS (4GB RAM, 2 CPU minimum)</div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📋 Important Notes</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Production-ready, tested system</div>
                    <div>• Requires technical knowledge of n8n</div>
                    <div>• Customization needed for your business</div>
                    <div>• Uses official Meta WhatsApp API</div>
                    <div>• Suitable for small-medium businesses</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button onClick={generatePDF} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download Proposal
                  </Button>
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    {showPreview ? "Hide" : "Preview"} Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Proposal Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <div className="text-center border-b pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-green-600 mb-2">🤖 WhatsApp AI Customer Service System</h1>
                  <p className="text-gray-600">Complete n8n Workflow Package - Production-Ready Solution</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">👤 Client Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <strong>Name:</strong> {clientInfo.name || "Not specified"}
                      </div>
                      <div>
                        <strong>Email:</strong> {clientInfo.email || "Not specified"}
                      </div>
                      <div>
                        <strong>Phone:</strong> {clientInfo.phone || "Not specified"}
                      </div>
                      <div>
                        <strong>Company:</strong> {clientInfo.company || "Not specified"}
                      </div>
                      {clientInfo.website && (
                        <div className="md:col-span-2">
                          <strong>Website:</strong> {clientInfo.website}
                        </div>
                      )}
                      {clientInfo.notes && (
                        <div className="md:col-span-2">
                          <strong>Notes:</strong> {clientInfo.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">📦 Proposal Details</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-green-50 rounded">
                        <span>Base Package - Complete WhatsApp AI System</span>
                        <span className="font-semibold">${basePrice}</span>
                      </div>
                      {selectedAddOns.map((id) => {
                        const addOn = addOns.find((a) => a.id === id)
                        return (
                          <div key={id} className="flex justify-between p-3 bg-gray-50 rounded">
                            <span>{addOn?.name}</span>
                            <span className="font-semibold">${addOn?.price}</span>
                          </div>
                        )
                      })}
                      {hasAddOnDiscount && (
                        <div className="flex justify-between p-3 bg-green-50 rounded text-green-700">
                          <span>Bundle Discount (10%)</span>
                          <span className="font-semibold">-${Math.round(addOnDiscount)}</span>
                        </div>
                      )}
                      {couponDiscount > 0 && (
                        <div className="flex justify-between p-3 bg-green-50 rounded text-green-700">
                          <span>Coupon Discount ({Math.round(appliedCoupon!.discount * 100)}%)</span>
                          <span className="font-semibold">-${Math.round(couponDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between p-4 bg-green-600 text-white rounded text-lg font-bold">
                        <span>Total Investment</span>
                        <span>${finalTotal}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-100 rounded text-blue-800">
                        <span>Payment: $500 upfront + ${finalTotal - 500} after deployment</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">⏰ Delivery Timeline</h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div>
                        <strong>Timeline:</strong> {totalDeliveryDays} business days
                      </div>
                      <div>
                        <strong>Expected Completion:</strong> {getEstimatedDate()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">✨ What's Included</h2>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      {[
                        "5 n8n Workflows (227 nodes)",
                        "Multi-language AI agent",
                        "Smart follow-up system",
                        "Human-in-the-loop",
                        "Vector knowledge base",
                        "Voice processing",
                        "Message queuing",
                        "WhatsApp Business API",
                        "CRM dashboard",
                        "Documentation",
                        "Setup support",
                        "No ongoing costs",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-sm mt-8 pt-6 border-t">
                  Proposal created: {new Date().toLocaleString("en-US")}
                  <br />
                  Valid for 30 days from creation date
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-green-600 mb-4">🎉 Coupon Applied!</DialogTitle>
            <DialogDescription className="text-lg text-gray-700 leading-relaxed">
              Your discount has been successfully applied. Ready to revolutionize your customer service?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
            >
              Let's Go! 🚀
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
