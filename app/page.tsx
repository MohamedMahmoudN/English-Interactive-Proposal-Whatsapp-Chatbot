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
  BarChart3,
  Users,
  Calendar,
  FileText,
  Rocket,
  MessageCircle,
  Check,
  DollarSign,
  TrendingUp,
  Star,
  AlertCircle,
  AlertTriangle,
  Info,
  Brain,
  Shield,
  Database,
  Target,
  Mic,
  Bell,
  GitBranch,
  Settings,
  CheckCircle2,
} from "lucide-react"

export default function ProposalPage() {
  const [name, setName] = useState("Jousef Murad")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [expedited, setExpedited] = useState(false)

  const basePrice = 750
  const expeditedPrice = 250
  const baseDays = 10
  const expeditedDays = 3

  const total = expedited ? basePrice + expeditedPrice : basePrice
  const days = expedited ? expeditedDays : baseDays

  const getDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const sendTelegram = async () => {
    try {
      const message = `🤖 New Proposal!

👤 CLIENT:
• Name: ${name || "Not specified"}
• Email: ${email || "Not specified"}
• Phone: ${phone || "Not specified"}
• Company: ${company || "Not specified"}

💰 DETAILS:
• Package: $${basePrice}
${expedited ? `• Expedited: $${expeditedPrice}` : ""}
• Total: $${total}
• Timeline: ${days} days

📅 ${new Date().toLocaleString("en-US")}`

      await fetch("https://api.telegram.org/bot8171309840:AAGwFKgF-XqYLEhOVmd7L1Zp9Q8oCawC3CU/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: "5239661627",
          text: message,
        }),
      })
    } catch (error) {
      console.error("Telegram error:", error)
    }
  }

  const downloadPDF = async () => {
    await sendTelegram()

    const win = window.open("", "_blank")
    if (!win) {
      alert("Please allow pop-ups")
      return
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Proposal</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #10b981; }
        .header h1 { color: #10b981; font-size: 32px; margin-bottom: 10px; }
        .section { margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; page-break-inside: avoid; }
        .section h2 { color: #1e40af; font-size: 20px; margin-bottom: 15px; }
        .section h3 { color: #374151; font-size: 16px; margin-bottom: 12px; margin-top: 20px; font-weight: bold; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .info-item { padding: 12px; background: white; border-radius: 6px; }
        .info-label { font-weight: bold; font-size: 11px; color: #666; text-transform: uppercase; }
        .info-value { font-size: 15px; color: #333; margin-top: 4px; }
        .price-row { display: flex; justify-content: space-between; padding: 15px; background: white; border-radius: 6px; margin-bottom: 10px; }
        .total { background: #10b981; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 8px; margin: 20px 0; }
        .payment { background: #3b82f6; color: white; padding: 15px; text-align: center; border-radius: 6px; margin: 15px 0; }
        .category { background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #10b981; }
        .category-title { font-weight: bold; font-size: 16px; color: #1f2937; margin-bottom: 10px; }
        .feature-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .feature-item:last-child { border-bottom: none; }
        .feature-title { font-weight: bold; font-size: 14px; color: #1f2937; margin-bottom: 4px; }
        .feature-desc { font-size: 13px; color: #6b7280; line-height: 1.5; }
        .workflow-item { background: white; padding: 15px; border-radius: 6px; margin-bottom: 10px; }
        .workflow-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .workflow-name { font-weight: bold; font-size: 15px; color: #1f2937; }
        .workflow-nodes { background: #10b981; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .workflow-desc { font-size: 13px; color: #6b7280; line-height: 1.5; }
        .tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .tech-item { background: white; padding: 12px; border-radius: 6px; }
        .tech-name { font-weight: bold; font-size: 14px; color: #1f2937; margin-bottom: 4px; }
        .tech-desc { font-size: 12px; color: #6b7280; }
        ul { list-style: none; padding: 0; }
        li { padding: 8px 0 8px 20px; position: relative; font-size: 14px; line-height: 1.6; }
        li:before { content: "•"; position: absolute; left: 0; color: #10b981; font-size: 18px; }
        .prereq-section { background: #fef3c7; padding: 20px; border-radius: 8px; border: 2px solid #f59e0b; }
        .prereq-section h3 { color: #92400e; }
        .prereq-section li { color: #78350f; }
        .prereq-section li:before { color: #f59e0b; }
        .notes-section { background: #dbeafe; padding: 20px; border-radius: 8px; border: 2px solid #3b82f6; }
        .notes-section h3 { color: #1e40af; }
        .notes-section li { color: #1e40af; }
        .notes-section li:before { color: #3b82f6; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 WhatsApp AI Customer Service System</h1>
        <p>Complete n8n Workflow Package - Battle-Tested Solution</p>
        <div style="display: flex; justify-content: center; gap: 15px; margin-top: 15px;">
            <span style="background: #f3f4f6; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: bold;">⭐ Battle-Tested</span>
            <span style="background: #f3f4f6; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: bold;">📊 150+ Nodes</span>
            <span style="background: #f3f4f6; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: bold;">✅ 5 Workflows</span>
        </div>
    </div>

    <div class="section">
        <h2>👤 Client Information</h2>
        <div class="info-grid">
            <div class="info-item"><div class="info-label">Name</div><div class="info-value">${name || "Not specified"}</div></div>
            <div class="info-item"><div class="info-label">Email</div><div class="info-value">${email || "Not specified"}</div></div>
            <div class="info-item"><div class="info-label">Phone</div><div class="info-value">${phone || "Not specified"}</div></div>
            <div class="info-item"><div class="info-label">Company</div><div class="info-value">${company || "Not specified"}</div></div>
        </div>
    </div>

    <div class="section">
        <h2>📦 Investment Details</h2>
        <div class="price-row"><span>Learning Package - 5 Battle-Tested Workflows</span><span style="font-weight: bold; color: #10b981;">$${basePrice}</span></div>
        ${expedited ? `<div class="price-row"><span>🚀 Expedited Delivery (3 Days)</span><span style="font-weight: bold; color: #8b5cf6;">$${expeditedPrice}</span></div>` : ""}
        <div class="total">TOTAL INVESTMENT: $${total}</div>
        <div class="payment">💳 Payment Terms: $500 upfront + $${total - 500} after successful deployment</div>
        <div style="background: #8b5cf6; color: white; padding: 15px; text-align: center; border-radius: 6px; font-weight: bold;">⏰ Timeline: ${days} business days | 📅 Expected Completion: ${getDate()}</div>
    </div>

    <div class="section">
        <h2>🚀 Complete Workflow Package - 150+ Total Nodes</h2>
        <div class="workflow-item">
            <div class="workflow-header">
                <div class="workflow-name">Main AI Agent Workflow</div>
                <div class="workflow-nodes">55 nodes</div>
            </div>
            <div class="workflow-desc">Core conversation handling with multi-language support, context memory, and intelligent response generation</div>
        </div>
        <div class="workflow-item">
            <div class="workflow-header">
                <div class="workflow-name">Smart Follow-Up System</div>
                <div class="workflow-nodes">21 nodes</div>
            </div>
            <div class="workflow-desc">Automated lead nurturing with silent customer detection, business hours awareness, and personalized re-engagement</div>
        </div>
        <div class="workflow-item">
            <div class="workflow-header">
                <div class="workflow-name">Human-in-the-Loop Manager</div>
                <div class="workflow-nodes">50 nodes</div>
            </div>
            <div class="workflow-desc">Seamless escalation handling, admin notifications, and continuous learning from human feedback</div>
        </div>
        <div class="workflow-item">
            <div class="workflow-header">
                <div class="workflow-name">Escalation Handler</div>
                <div class="workflow-nodes">8 nodes</div>
            </div>
            <div class="workflow-desc">Confidence-based routing for complex conversations requiring human expertise and immediate attention</div>
        </div>
        <div class="workflow-item">
            <div class="workflow-header">
                <div class="workflow-name">Knowledge Base Engine</div>
                <div class="workflow-nodes">19 nodes</div>
            </div>
            <div class="workflow-desc">Real-time Google Drive monitoring with automatic content updates</div>
        </div>
    </div>

    <div class="section">
        <h2>✨ Complete Feature Set</h2>
        
        <div class="category">
            <div class="category-title">Advanced AI Intelligence</div>
            <div class="feature-item">
                <div class="feature-title">Multi-Language Support</div>
                <div class="feature-desc">Fluent Arabic (Hijazi dialect) and English with cultural authenticity and region-specific expressions</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Context-Aware Responses</div>
                <div class="feature-desc">Remembers entire conversation history for coherent interactions</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Confidence Scoring System</div>
                <div class="feature-desc">Routes uncertain responses to humans with multi-factor confidence analysis for quality assurance</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Dynamic Persona Adaptation</div>
                <div class="feature-desc">Adjusts tone and communication style based on customer type and conversation context</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Voice Message Processing</div>
                <div class="feature-desc">Understands and transcribes audio messages automatically using Google's speech-to-text with dialect support</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Natural Voice Synthesis</div>
                <div class="feature-desc">ElevenLabs integration for high-quality Arabic voice responses with authentic pronunciation</div>
            </div>
        </div>

        <div class="category">
            <div class="category-title">Production-Grade Architecture</div>
            <div class="feature-item">
                <div class="feature-title">Message Queue System</div>
                <div class="feature-desc">PostgreSQL-based queuing prevents race conditions with rapid message handling and collision prevention</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Robust Conversation Memory</div>
                <div class="feature-desc">Complete conversation tracking and history with structured data storage for context preservation</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Anti-Collision Logic</div>
                <div class="feature-desc">Handles overlapping message scenarios gracefully with intelligent message deduplication</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Error Recovery & Retry</div>
                <div class="feature-desc">Implemented some retry mechanisms for more reliable message delivery</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Real-Time File Monitoring</div>
                <div class="feature-desc">Google Drive integration with automatic content updates</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Official WhatsApp API</div>
                <div class="feature-desc">Uses Meta's official Business API for compliance, stability, and delivery receipts</div>
            </div>
        </div>

        <div class="category">
            <div class="category-title">Human-in-the-Loop System</div>
            <div class="feature-item">
                <div class="feature-title">Smart Escalation Triggers</div>
                <div class="feature-desc">Multi-factor confidence analysis automatically routes complex conversations to human agents</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Seamless Agent Handoff</div>
                <div class="feature-desc">Maintains conversation flow and context when transferring to human support team</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Instant Admin Notifications</div>
                <div class="feature-desc">Real-time Telegram alerts for urgent conversations requiring immediate attention</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Response Review System</div>
                <div class="feature-desc">Human agents can approve, modify, or reject AI responses implementing HITL feature</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Self-Learning Capability</div>
                <div class="feature-desc">System continuously improves from admin feedback and corrections over time</div>
            </div>
        </div>

        <div class="category">
            <div class="category-title">Intelligent Follow-Up Automation</div>
            <div class="feature-item">
                <div class="feature-title">Silent Customer Detection</div>
                <div class="feature-desc">Identifies prospects who stopped responding and triggers personalized re-engagement sequences</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Business Hours Awareness</div>
                <div class="feature-desc">Respects operating schedules and sends messages only during appropriate times</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Personalized Re-engagement</div>
                <div class="feature-desc">AI-generated follow-up messages that reference previous conversation topics naturally</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Conversation Context Memory</div>
                <div class="feature-desc">References specific details from previous discussions for authentic, relevant follow-ups</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Duplicate Prevention</div>
                <div class="feature-desc">Tracks follow-up history to prevent message spam and maintain professional communication</div>
            </div>
        </div>

        <div class="category">
            <div class="category-title">Knowledge Base & Content</div>
            <div class="feature-item">
                <div class="feature-title">Dynamic Content Updates</div>
                <div class="feature-desc">Real-time Google Drive monitoring automatically updates knowledge base when files change</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Multi-Format Support</div>
                <div class="feature-desc">Processes PDFs, Word docs, text files, and more with automatic text extraction</div>
            </div>
            <div class="feature-item">
                <div class="feature-title">Version Control</div>
                <div class="feature-desc">Maintains knowledge base versions and tracks content changes over time</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🛠 Technology Stack</h2>
        <div class="tech-grid">
            <div class="tech-item">
                <div class="tech-name">n8n</div>
                <div class="tech-desc">Main workflow orchestration platform</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Google Gemini</div>
                <div class="tech-desc">AI conversations + embeddings + transcription</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Live Chat Dashboard</div>
                <div class="tech-desc">WhatsApp Business API integration & CRM</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">PostgreSQL</div>
                <div class="tech-desc">Message queuing + conversation memory</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">ElevenLabs</div>
                <div class="tech-desc">High-quality Arabic voice synthesis</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Telegram</div>
                <div class="tech-desc">Admin notification system</div>
            </div>
            <div class="tech-item">
                <div class="tech-name">Supabase</div>
                <div class="tech-desc">PostgreSQL database hosting</div>
            </div>
        </div>
    </div>

    <div class="section prereq-section">
        <h3>📋 Prerequisites to Get Started</h3>
        <ul>
            <li>Supabase PostgreSQL database - Can be installed on your VPS or use managed service</li>
            <li>Google Cloud account - For Google Drive and Gemini API access (free tier available with generous limits)</li>
            <li>WhatsApp Business API access - Through Meta official integration</li>
            <li>VPS or hosting environment - Minimum 4GB RAM, 2 CPU cores recommended - (preferably Hostinger's KMV2 plan) for self hosting the Live Chat Dashboard and n8n instance all for around $10/month</li>
            <li>Domain name with SSL certificate - For secure webhook connections (can be done on Hostinger easily as well)</li>
            <li>Optional: ElevenLabs account for voice synthesis (for replying in voice feature)</li>
        </ul>
    </div>

    <div class="section notes-section">
        <h3>📋 Important Notes</h3>
        <ul>
            <li>This system is battle-tested with real customer in live business environment</li>
            <li>Workflows are for learning purposes, may require some customization for your specific business requirements and processes (like implementing the human agent conversation assigning)</li>
            <li>Technical knowledge of n8n and related services is recommended for optimal setup and maintenance</li>
            <li>System uses official Meta WhatsApp Business API for compliance and stability</li>
            <li>Currently tested with small-sized business with prospects for scaling</li>
            <li>Represents months of learning, development, client testing, and real-world optimization</li>
            <li>To proceed with getting the PayPal link, please reply to our current Reddit conversation and I will send you the payment link</li>
        </ul>
    </div>

    <div class="section">
        <h2>📦 What's Included</h2>
        <ul>
            <li><strong>5 Complete n8n Workflows</strong> - 150+ total nodes with battle-tested implementation and error handling</li>
            <li><strong>Setup & Configuration Guides</strong> - Step-by-step instructions for deploying on your infrastructure</li>
            <li><strong>Setup one testing version</strong> - A ready testing version fully setup and delivered on your infrastructure</li>
        </ul>
    </div>

    <div style="margin-top: 40px; text-align: center; color: #666; border-top: 2px solid #e5e7eb; padding-top: 20px;">
        <p><strong>Proposal created:</strong> ${new Date().toLocaleString("en-US")}</p>
        <p>This proposal is valid for 30 days from the creation date</p>
        <p style="margin-top: 12px; font-weight: bold; color: #10b981;">Payment Method: PayPal Available</p>
        <p style="margin-top: 8px; font-style: italic;">This product represents months of learning, development, client testing, and real-world optimization.<br/>You're getting a proven, battle-tested system used in live business environments.</p>
    </div>
</body>
</html>`

    win.document.write(html)
    win.document.close()
    setTimeout(() => {
      win.print()
      win.close()
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">WhatsApp AI Customer Service System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete n8n Workflow Package - Battle-Tested AI Automation
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">Battle-Tested</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-semibold">150+ Nodes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">5 Workflows</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <Input value={company} onChange={(e) => setCompany(e.target.value)} className="border-gray-300" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Website</label>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} className="border-gray-300" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Notes</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="border-gray-300 min-h-20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="border-b bg-white/50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  Learning Package
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between p-6 border-2 border-green-300 bg-white rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Complete WhatsApp AI System</h3>
                    <p className="text-sm text-gray-600 mb-3">5 Battle-Tested n8n Workflows (150+ Nodes)</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        Battle-Tested
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Multi-Language
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-3xl font-bold text-green-600">${basePrice}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 justify-end mt-1">
                      <Clock className="h-4 w-4" />
                      {baseDays} days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-purple-50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  Complete Feature Set
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-700">
                      <Brain className="h-5 w-5 flex-shrink-0" />
                      <h3 className="font-bold text-sm">Advanced AI Intelligence</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Multi-Language Support</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Fluent Arabic (Hijazi dialect) and English with cultural authenticity
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Context-Aware Responses</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Remembers entire conversation history for coherent interactions
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Confidence Scoring System</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Routes uncertain responses to humans with multi-factor confidence analysis
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Dynamic Persona Adaptation</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Adjusts tone and style based on customer type and conversation context
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Voice Message Processing</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Transcribes audio messages using Google's speech-to-text with dialect support
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Natural Voice Synthesis</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            ElevenLabs integration for high-quality Arabic voice responses
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-green-50 border-green-200 text-green-700">
                      <Shield className="h-5 w-5 flex-shrink-0" />
                      <h3 className="font-bold text-sm">Production-Grade Architecture</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Message Queue System</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            PostgreSQL-based queuing prevents race conditions with collision prevention
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Robust Conversation Memory</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Complete conversation tracking with structured data storage
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Anti-Collision Logic</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Handles overlapping message scenarios with intelligent deduplication
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Error Recovery & Retry</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Implemented retry mechanisms for reliable message delivery
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Real-Time File Monitoring</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Google Drive integration with automatic content updates
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Official WhatsApp API</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Uses Meta's official Business API for compliance and stability
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-purple-50 border-purple-200 text-purple-700">
                      <Users className="h-5 w-5 flex-shrink-0" />
                      <h3 className="font-bold text-sm">Human-in-the-Loop System</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Smart Escalation Triggers</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Multi-factor confidence analysis routes complex conversations to human agents
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Seamless Agent Handoff</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Maintains conversation flow and context when transferring to human support
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Instant Admin Notifications</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Real-time Telegram alerts for urgent conversations requiring attention
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Response Review System</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Human agents can approve, modify, or reject AI responses
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Self-Learning Capability</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            System continuously improves from admin feedback and corrections
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-amber-50 border-amber-200 text-amber-700">
                      <Target className="h-5 w-5 flex-shrink-0" />
                      <h3 className="font-bold text-sm">Intelligent Follow-Up Automation</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Silent Customer Detection</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Identifies prospects who stopped responding and triggers re-engagement
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Business Hours Awareness</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Respects operating schedules and sends messages during appropriate times
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Personalized Re-engagement</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            AI-generated follow-ups that reference previous conversation topics
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Conversation Context Memory</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            References specific details from previous discussions for authentic follow-ups
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Duplicate Prevention</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Tracks follow-up history to prevent message spam
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-indigo-50 border-indigo-200 text-indigo-700">
                      <Database className="h-5 w-5 flex-shrink-0" />
                      <h3 className="font-bold text-sm">Knowledge Base & Content</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Dynamic Content Updates</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Real-time Google Drive monitoring automatically updates knowledge base
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Multi-Format Support</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Processes PDFs, Word docs, text files with automatic text extraction
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900 mb-1">Version Control</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            Maintains knowledge base versions and tracks content changes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-indigo-50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <GitBranch className="h-5 w-5 text-indigo-600" />
                  </div>
                  5 Complete Workflows (150+ Nodes)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Main AI Agent Workflow</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-200">55 nodes</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Core conversation handling with multi-language support, context memory, and intelligent response
                        generation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Target className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Smart Follow-Up System</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-200">21 nodes</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Automated lead nurturing with silent customer detection, business hours awareness, and
                        personalized re-engagement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Human-in-the-Loop Manager</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-200">50 nodes</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Seamless escalation handling, admin notifications, and continuous learning from human feedback
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Escalation Handler</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-200">8 nodes</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Confidence-based routing for complex conversations requiring human expertise and immediate
                        attention
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Database className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Knowledge Base Engine</h4>
                        <Badge className="bg-green-100 text-green-700 border-green-200">19 nodes</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Real-time Google Drive monitoring with automatic content updates
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Settings className="h-5 w-5 text-cyan-600" />
                  </div>
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <GitBranch className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">n8n</div>
                      <div className="text-xs text-gray-600">Main workflow orchestration platform</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <Brain className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">Google Gemini</div>
                      <div className="text-xs text-gray-600">AI conversations + embeddings + transcription</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <MessageCircle className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">Live Chat Dashboard</div>
                      <div className="text-xs text-gray-600">WhatsApp Business API integration & CRM</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <Database className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">PostgreSQL</div>
                      <div className="text-xs text-gray-600">Message queuing + conversation memory</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <Mic className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">ElevenLabs</div>
                      <div className="text-xs text-gray-600">High-quality Arabic voice synthesis</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <Bell className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">Telegram</div>
                      <div className="text-xs text-gray-600">Admin notification system</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-white rounded-lg border border-gray-200">
                      <Shield className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 mb-1">Supabase</div>
                      <div className="text-xs text-gray-600">PostgreSQL database hosting</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-yellow-50">
              <CardHeader className="border-b bg-white/50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    "Supabase PostgreSQL database - Can be installed on your VPS or use managed service",
                    "Google Cloud account - For Google Drive and Gemini API access (free tier available with generous limits)",
                    "WhatsApp Business API access - Through Meta official integration",
                    "VPS or hosting environment - Minimum 4GB RAM, 2 CPU cores recommended - (preferably Hostinger's KMV2 plan) for self hosting the Live Chat Dashboard and n8n instance all for around $10/month",
                    "Domain name with SSL certificate - For secure webhook connections (can be done on Hostinger easily as well)",
                    "Optional: ElevenLabs account for voice synthesis (for replying in voice feature)",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200">
                      <Check className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-900 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader className="border-b bg-white/50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    "This system is battle-tested with real customers in live business environments",
                    "Workflows are for learning purposes, may require some customization for your specific business requirements and processes (like implementing the human agent conversation assigning)",
                    "Technical knowledge of n8n and related services is recommended for optimal setup and maintenance",
                    "System uses official Meta WhatsApp Business API for compliance and stability",
                    "Currently tested with small-sized business with prospects for scaling",
                    "Represents months of learning, development, client testing, and real-world optimization",
                    "To proceed with getting the PayPal link, please reply to our current Reddit conversation and I will send you the payment link",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-900 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl sticky top-6">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                    <span className="font-medium text-gray-700">Learning Package</span>
                    <span className="font-bold text-gray-900">${basePrice}</span>
                  </div>
                  {expedited && (
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <span className="font-medium text-gray-700 text-sm flex items-center gap-1">
                        <Rocket className="h-4 w-4" />
                        Expedited
                      </span>
                      <span className="font-bold text-gray-900">${expeditedPrice}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-700 mb-3 font-semibold">
                      <Calendar className="h-5 w-5" />
                      Delivery
                    </div>
                    <div className="text-sm text-purple-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">{days} business days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completion:</span>
                        <span className="font-semibold">{getDate()}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      expedited ? "border-purple-500 bg-purple-50 shadow-md" : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setExpedited(!expedited)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox checked={expedited} readOnly className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Rocket className={`h-4 w-4 ${expedited ? "text-purple-600" : "text-gray-600"}`} />
                          <h4 className="font-semibold text-sm">Expedited Delivery</h4>
                        </div>
                        <p className="text-xs text-gray-600">Priority deployment in 3 days</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">+${expeditedPrice}</div>
                        <div className="text-xs text-gray-500">-7 days</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-xl text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90 mb-1">Total Investment</div>
                      <div className="text-3xl font-bold">${total}</div>
                    </div>
                    <DollarSign className="h-12 w-12 opacity-50" />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700 mb-2 font-semibold text-sm">
                    <DollarSign className="h-4 w-4" />
                    Payment Terms
                  </div>
                  <div className="text-sm text-blue-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Upfront:</span>
                      <span className="font-semibold">$500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>After Deployment:</span>
                      <span className="font-semibold">${total - 500}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-center text-blue-700 font-medium">PayPal Available</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">What's Included</h4>
                  <div className="space-y-1.5 text-xs">
                    {[
                      "5 Complete Workflows (150+ nodes)",
                      "Multi-language AI agent",
                      "Smart follow-up automation",
                      "Human-in-the-loop system",
                      "Knowledge base engine",
                      "Voice message processing",
                      "PostgreSQL message queuing",
                      "Official WhatsApp API",
                      "Setup guides",
                      "Testing version fully setup",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 py-0.5">
                        <Check className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={downloadPDF}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                    size="lg"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Proposal
                  </Button>
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {showPreview ? "Hide" : "Preview"} Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showPreview && (
          <Card className="mt-8 border-0 shadow-xl">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="bg-white p-8 rounded-lg border max-w-5xl mx-auto">
                <div className="text-center border-b-2 pb-8 mb-8">
                  <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">WhatsApp AI Customer Service System</h1>
                  <p className="text-lg text-gray-600 mb-4">Complete n8n Workflow Package</p>
                  <div className="flex items-center justify-center gap-4">
                    <Badge className="bg-gray-100 text-gray-700">⭐ Battle-Tested</Badge>
                    <Badge className="bg-gray-100 text-gray-700">📊 150+ Nodes</Badge>
                    <Badge className="bg-gray-100 text-gray-700">✅ 5 Workflows</Badge>
                  </div>
                </div>

                <div className="space-y-8 text-sm">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Client Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Name</div>
                        <div className="font-semibold text-gray-900">{name || "Not specified"}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Email</div>
                        <div className="font-semibold text-gray-900">{email || "Not specified"}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Phone</div>
                        <div className="font-semibold text-gray-900">{phone || "Not specified"}</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Company</div>
                        <div className="font-semibold text-gray-900">{company || "Not specified"}</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                      <BarChart3 className="h-6 w-6" />
                      Investment Details
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <span className="font-medium">Learning Package - 5 Workflows</span>
                        <span className="font-bold text-green-600">${basePrice}</span>
                      </div>
                      {expedited && (
                        <div className="flex justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium">🚀 Expedited Delivery</span>
                          <span className="font-bold text-purple-600">${expeditedPrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-lg font-bold">
                        <span>Total Investment</span>
                        <span>${total}</span>
                      </div>
                      <div className="flex justify-between p-4 bg-blue-100 rounded-lg text-blue-800 border border-blue-200">
                        <span className="font-medium">Payment: $500 upfront + ${total - 500} after deployment</span>
                      </div>
                      <div className="flex justify-between p-4 bg-purple-100 rounded-lg text-purple-800 border border-purple-200">
                        <span className="font-medium">
                          Timeline: {days} days | Completion: {getDate()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-xs mt-8 pt-8 border-t">
                  <p>Download PDF for complete proposal with all features and details</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
