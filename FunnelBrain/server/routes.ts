import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertAdCreativeSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.post("/api/creatives", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const validation = insertAdCreativeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error);
    }

    try {
      const creative = await storage.createAdCreative({
        ...validation.data,
        userId: req.user!.id,
        createdAt: new Date().toISOString(),
      });
      res.status(201).json(creative);
    } catch (error) {
      res.status(500).json({ message: "Failed to create creative" });
    }
  });

  app.get("/api/creatives", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const creatives = await storage.getAdCreativesByUser(req.user!.id);
      res.json(creatives);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creatives" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
